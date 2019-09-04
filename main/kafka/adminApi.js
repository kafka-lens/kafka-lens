const kafka = require('kafka-node');
const { zipArrays } = require('../utils/arrayHelper');
const offsetApi = require('./offsetApi');
const logger = require('../utils/logger');

const adminApi = {};

function wrapInTimeout(
  callback,
  initialMsToTimeout = 15000,
  msIncreasePerTry = 5000,
  triesIncreaseCap = 1,
) {
  let tries = 0;
  let currentTimeoutId;
  let currentReject;

  return function invokeWithTimeout(...args) {
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
      currentTimeoutId = null;
    }

    if (currentReject) {
      currentReject('ignore');
      currentReject = null;
    }

    return new Promise((resolve, reject) => {
      currentReject = reject.bind(this);
      tries = Math.min(tries + 1, triesIncreaseCap);

      callback(...args)
        .then(result => resolve(result))
        .catch(err => reject(err));

      const msToTimeout = initialMsToTimeout + (tries - 1) * msIncreasePerTry;
      currentTimeoutId = setTimeout(() => {
        currentTimeoutId = null;
        return reject(new Error(`${callback.name} timed out after ${msToTimeout}ms`));
      }, msToTimeout);
    });
  };
}

function getTopicData(kafkaHostURI) {
  const topicNamesToIgnore = ['__consumer_offsets', 'null', 'undefined'];

  return new Promise((resolve, reject) => {
    // Declares a new instance of client that will be used to make a connection
    const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
    // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
    const admin = new kafka.Admin(client);

    // Fetch all topics from the Kafka broker
    admin.listTopics((err, data) => {
      if (err) return reject(new Error(`getting list of Topics:${err}`));

      // Reassign topics with only the object containing the topic data
      logger.log('Result of admin.listTopics API call:', data);
      const topicsMetadata = data[1].metadata;

      logger.log('topicsMetadata obtained:', topicsMetadata);

      const topics = Object.entries(topicsMetadata)
        .filter(([topicName]) => !topicNamesToIgnore.includes(topicName))
        .map(([topicName, topicPartitions]) => ({
          numberOfPartitions: Object.keys(topicPartitions).length,
          topicName,
        }));

      // for each topic, get # of partitions and storing that in topic partitions
      const promises = topics.map(({ topicName, numberOfPartitions }) =>
        adminApi.getTopicMsgCount(kafkaHostURI, topicName, numberOfPartitions),
      );

      return Promise.all(promises)
        .then(topicMsgCounts => {
          const result = zipArrays(topics, topicMsgCounts).map(([topicInfo, msgCount]) => ({
            msgCount,
            ...topicInfo,
          }));

          logger.log('final topic Data:', result);
          client.close();
          return resolve(result);
        })
        .catch(error => {
          client.close();
          return reject(new Error(`getting all topicMsgCounts:${error}`));
        });
    });
  });
}

/**
 * @param {String} kafkaHostURI the connection uri that the user types into connection input
 * @param {*} mainWindow Main window that gets data
 *
 * Makes a connection to Kafka server to fetch a list of topics
 * Transforms the data coming back from the Kafka broker into pertinent data to send back to client
 */
adminApi.getTopicData = wrapInTimeout(getTopicData, 100000, 5000, 10);

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} numberOfPartitions Number of partitions in a topic
 *
 * This function will return a promise. Function will loop through the number of partitions
 * in a topic getting the current message count for each of the partitions.
 * Resolves to the aggregated number of messages from all partitions.
 */
adminApi.getTopicMsgCount = (kafkaHostURI, topicName, numberOfPartitions) => {
  const promises = [];
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Create for loop with limit of n-partition iterations
    for (let i = 0; i < numberOfPartitions; i += 1) {
      promises.push(adminApi.getPartitionMsgCount(kafkaHostURI, topicName, i));
    }
    // Resolves when all promises from array are resolved (with a single number)
    Promise.all(promises)
      .then(partitionMsgsCount => {
        const topicMsgsCount = partitionMsgsCount.reduce((total, curr) => total + curr, 0);
        resolve(topicMsgsCount);
      })
      .catch(err => reject(err));
  });
};

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} partitionId Topic partition number. Defaults to 0
 *
 * @returns {Promise} Resolves to the number of messages in a specific partition
 */
adminApi.getPartitionMsgCount = (kafkaHostURI, topicName, partitionId = 0) => {
  const promises = [];
  return new Promise((resolve, reject) => {
    promises.push(offsetApi.getEarliestOffset(kafkaHostURI, topicName, partitionId));
    promises.push(offsetApi.getLatestOffset(kafkaHostURI, topicName, partitionId));
    Promise.all(promises)
      .then(([earliestOffset, latestOffset]) => {
        resolve(latestOffset - earliestOffset);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} partitionId Topic partition number. Defaults to 0
 *
 * This function returns data to the renderer process.
 * Calls getLatestOffset and getCurrentMsgCount, then sends back the result
 * as an object containing highwaterOffset and messageCount as properties.
 */
adminApi.getPartitionBrokers = (kafkaHostURI, topicName, partitionId = 0) => {
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
  const admin = new kafka.Admin(client);
  const brokerPartitionData = [];

  return new Promise((resolve, reject) => {
    admin.listTopics((err, data) => {
      if (err) reject(err); // TODO: Handle listTopics error properly
      // Reassign topics with only the object containing the topic info
      // Isolate leader broker and replica brokers array into brokerPartitionData array
      const topicsMetadata = data[1].metadata;
      const { leader } = topicsMetadata[topicName][partitionId];
      const replicas = topicsMetadata[topicName][partitionId].replicas.filter(b => b !== leader);
      brokerPartitionData.push(leader);
      brokerPartitionData.push(replicas);

      client.close();
      resolve(brokerPartitionData);
    });
  });
};

module.exports = adminApi;
