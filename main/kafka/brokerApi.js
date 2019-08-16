const kafka = require('kafka-node');
const offsetApi = require('../kafka/offsetApi.js');
const logger = require('../utils/logger');

const brokerApi = {};

const topicsCache = {};

brokerApi.calcAndCacheMsgsPerSecond = (kafkaHostURI, topicName, partitionId, leader) => {
  // initialize in case of new topic / partition
  if (!topicsCache[topicName]) topicsCache[topicName] = {};
  const topic = topicsCache[topicName];
  if (!topic[partitionId]) topic[partitionId] = {};
  const partition = topic[partitionId];
  partition.leader = leader;

  return new Promise((resolve, reject) => {
    offsetApi
      .getLatestOffset(kafkaHostURI, topicName, partitionId)
      .then(newOffset => {
        const currentTime = Date.now();
        if (partition.timeStamp === undefined) {
          partition.lastOffset = newOffset;
          partition.timeStamp = currentTime;
          partition.newMessagesPerSecond = null;
          return resolve(0);
        }

        const newMsgsAmount = newOffset - partition.lastOffset;
        const elapsedTimeInSeconds = (currentTime - partition.timeStamp) / 1000;

        partition.newMessagesPerSecond = Math.floor(newMsgsAmount / elapsedTimeInSeconds);
        partition.lastOffset = newOffset;
        partition.timeStamp = currentTime;
        return resolve(partition.newMessagesPerSecond);
      })
      .catch(err => reject(err));
  });
};

/**
 * Returned info from listTopics:
 * [
 *   {  // Only brokers that are alive
 *     brokerId: {
 *       nodeId: brokerId (0),
 *       host: systemName - or something like this... ('robot-boyfriend' | 'ubuntu' | ...),
 *       port: brokerPort (9092),
 *     }
 *   },
 *   {
 *     metadata: {
 *       topicName: {
 *         partitionId: {
 *           topic: topicName ('third'),
 *           partition: partitionId (1),
 *           leader: brokerId (0),
 *           replicas: brokerId[] ([1, 2]),
 *           isr: brokerId[] ([1]),
 *         }
 *       }
 *     }
 *   }
 * ]
 *
 * will return an object of this type of objects:
 *
 * {{
 *   brokerId: Number,
 *   brokerURI: Number,
 *   topics: [],
 *   isAlive: Boolean,
 * }}
 *
 * @returns (Promise)
 */
brokerApi.getBrokerData = kafkaHostURI => {
  logger.log('attempting connection to uri', kafkaHostURI);
  return new Promise((resolve, reject) => {
    // Declares a new instance of client that will be used to make a connection
    const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
    // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
    const admin = new kafka.Admin(client);
    const brokerResult = {};

    // Fetch all topics from the Kafka broker
    admin.listTopics((err, data) => {
      if (err) {
        logger.error(err);
        client.close();
        return reject({ error: err });
      }

      // Reassign topics with only the object containing the topic data
      // logger.log('brokerMetadata IN BROKER API:', data[0]);
      const brokerMetadata = data[0];
      const topicsMetadata = data[1].metadata;

      logger.log('Object Entries of brokerMetadata', Object.entries(brokerMetadata));

      Object.entries(brokerMetadata).forEach(([broker, brokerData]) => {
        brokerResult[broker] = {
          brokerId: brokerData.nodeId,
          brokerURI: `${brokerData.host}:${brokerData.port}`,
          topics: {},
          isAlive: true,
        };
      });

      return Object.entries(topicsMetadata).forEach(([topicName, topic]) => {
        const calcAndCacheMsgsPerSecondPromises = [];

        if (topicName === '__consumer_offsets') return;
        // for each topic, find associated broker and add topic name to topic array in brokerResults

        const associatedBrokers = new Set();
        Object.values(topic).forEach(partition => {
          logger.log('partition:', partition);
          for (let i = 0; i < partition.replicas.length; i++) {
            const partitionId = partition.replicas[i];
            associatedBrokers.add(partitionId);
          }

          logger.log(`associated Brokers for topic ${topicName}:`, associatedBrokers);

          calcAndCacheMsgsPerSecondPromises.push(
            brokerApi.calcAndCacheMsgsPerSecond(
              kafkaHostURI,
              topicName,
              partition.partition,
              partition.leader,
            ),
          );
        });

        logger.log(`associated Brokers for topic ${topicName}:`, associatedBrokers);

        associatedBrokers.forEach(id => {
          if (!Object.hasOwnProperty.call(brokerResult, id)) {
            brokerResult[id] = {
              brokerId: id,
              brokerURI: 'Unknown',
              topics: {},
              isAlive: false,
            };
          }
          const brokerInfo = brokerResult[id];
          brokerInfo.topics[topicName] = { topicName, newMessagesPerSecond: null, isLeader: false };
        });

        logger.log('brokerResult before msgsPerSecond:', brokerResult);
        Promise.all(calcAndCacheMsgsPerSecondPromises)
          .then(() => {
            logger.log('topicsCache:', topicsCache);
            Object.entries(topicsCache).forEach(([cachedTopicName, cachedPartitions]) => {
              logger.log('cachedTopicName:', cachedTopicName);
              Object.values(cachedPartitions).forEach(cachedPartition => {
                logger.log('cachedPartition:', cachedPartition);
                const brokerInfo = brokerResult[cachedPartition.leader];
                logger.log('brokerInfo:', brokerInfo);
                const cachedTopic = brokerInfo.topics[cachedTopicName];
                cachedTopic.isLeader = true;
                if (cachedTopic.newMessagesPerSecond === null) cachedTopic.newMessagesPerSecond = 0;
                cachedTopic.newMessagesPerSecond += cachedPartition.newMessagesPerSecond;
              });
            });

            logger.log('brokerResult after msgsPerSecond:', JSON.stringify(brokerResult));
            client.close();
            return resolve({ data: brokerResult });
          })
          .catch(error => {
            logger.error('ERROR GETTING msgsPerSecond:', error);
            client.close();
            return reject({ error });
          });
      });
    });
  });
};

module.exports = brokerApi;
