const kafka = require('kafka-node');
const offsetApi = require('../kafka/offsetApi.js');

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
 * @returns {{
 *         brokerId: Number,
 *         brokerURI: Number,
 *         topics: [],
 *         isAlive: Boolean,
 *       }} object of this type of objects
 */
brokerApi.getBrokerData = (kafkaHostURI) => {
  console.log('attempting connection to uri', kafkaHostURI);
  return new Promise((resolve, reject) => {
    // Declares a new instance of client that will be used to make a connection
    const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
    // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
    const admin = new kafka.Admin(client);
    const brokerResult = {};

    // Fetch all topics from the Kafka broker
    admin.listTopics((err, data) => {
      if (err) {
        console.error(err);
        client.close();
        return reject({error: err});
      }

      // Reassign topics with only the object containing the topic data
      //console.log('brokerMetadata IN BROKER API:', data[0]);
      const brokerMetadata = data[0];
      const topicsMetadata = data[1].metadata;

      console.log('Object Entries of brokerMetadata', Object.entries(brokerMetadata));

      Object.entries(brokerMetadata).forEach(([broker, brokerData]) => {
        brokerResult[broker] = {
          brokerId: brokerData.nodeId,
          brokerURI: brokerData.host + ':' + brokerData.port,
          topics: {},
          isAlive: true
        };
      });

      Object.entries(topicsMetadata).forEach(([topicName, topic]) => {
        const calcAndCacheMsgsPerSecondPromises = [];

        if (topicName === '__consumer_offsets') return;
        // for each topic, find associated broker and add topic name to topic array in brokerResults
        
        const associatedBrokers = new Set();
        Object.values(topic).forEach(partition => {
          console.log('partition:', partition);
          for (let i = 0; i < partition.replicas.length; i++) {
            const partitionId = partition.replicas[i];
            associatedBrokers.add(partitionId);
          }

          console.log(`associated Brokers for topic ${topicName}:`, associatedBrokers);

          calcAndCacheMsgsPerSecondPromises.push(
            brokerApi.calcAndCacheMsgsPerSecond(
              kafkaHostURI,
              topicName,
              partition.partition,
              partition.leader
            )
          );
        });

        console.log(`associated Brokers for topic ${topicName}:`, associatedBrokers);

        associatedBrokers.forEach(id => {
          if (!brokerResult.hasOwnProperty(id)) {
            brokerResult[id] = {
              brokerId: id,
              brokerURI: 'Unknown',
              topics: {},
              isAlive: false
            };
          }
          const brokerInfo = brokerResult[id];
          brokerInfo.topics[topicName] = { topicName: topicName, newMessagesPerSecond: null, isLeader: false };
        });

        console.log('brokerResult before msgsPerSecond:', brokerResult);
        Promise.all(calcAndCacheMsgsPerSecondPromises)
          .then(() => {
            console.log('topicsCache:', topicsCache);
            Object.entries(topicsCache).forEach(([topicName, cachedPartitions]) => {
              console.log('topicName:', topicName);
              Object.values(cachedPartitions).forEach(cachedPartition => {
                console.log('cachedPartition:', cachedPartition);
                const brokerInfo = brokerResult[cachedPartition.leader];
                console.log('brokerInfo:', brokerInfo);
                const topic = brokerInfo.topics[topicName];
                topic.isLeader = true;
                if (topic.newMessagesPerSecond === null) topic.newMessagesPerSecond = 0;
                topic.newMessagesPerSecond += cachedPartition.newMessagesPerSecond;
              });
            });

            console.log('brokerResult after msgsPerSecond:', JSON.stringify(brokerResult));
            client.close();
            return resolve({ data: brokerResult });
          })
          .catch(err => {
            console.error('ERROR GETTING msgsPerSecond:', err);
            client.close();
            return reject({ error: err });
          });
      });
    });
  });
};

module.exports = brokerApi;
