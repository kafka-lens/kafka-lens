const kafka = require('kafka-node');
const { zipArrays } = require('../utils/arrayHelper');
const offsetApi = require('./offsetApi');

const adminApi = {};

/**
 * @param {String} kafkaHostURI the connection uri that the user types into connection input
 * @param {Electron Window} mainWindow Main window that gets data
 *
 * Makes a connection to Kafka server to fetch a list of topics
 * Transforms the data coming back from the Kafka broker into pertinent data to send back to client
 */
adminApi.getTopicData = (kafkaHostURI, mainWindow) => {
  // Declares a new instance of client that will be used to make a connection
  const client = new kafka.KafkaClient({ kafkaHostURI });
  // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
  const admin = new kafka.Admin(client);
  let isRunning = false;

  // Fetch all topics from the Kafka broker
  admin.listTopics((err, data) => {
    if (err) console.error(err);  // TODO: Handle listTopics error properly
    
    isRunning = true;

    // Reassign topics with only the object containing the topic data
    console.log('Result of admin.listTopics API call:', data)
    topicsMetadata = data[1].metadata;

    const topics = Object.entries(topicsMetadata).map(([topicName, topicPartitions]) => {
      return {
        numberOfPartitions: Object.keys(topicPartitions).length,
        topicName,
      }
    }); 

    const promises = topics.map(({topicName, numberOfPartitions}) => {
      // for each topic, get # of partitions and storing that in topic partitions
      return adminApi.getTopicMsgCount(kafkaHostURI, topicName, numberOfPartitions);
    });

    Promise.all(promises)
      .then(topicMsgCounts => {
        const result = zipArrays(topics, topicMsgCounts)
          .map(([topicInfo, msgCount]) => Object.assign({msgCount: msgCount}, topicInfo));

        console.log('final topic Data:', result);
        mainWindow.webContents.send('topic:getTopics', result);
    });
  });
  // needed for error handling to check if connection timed out
  setTimeout(() => {
    if (!isRunning) {
      mainWindow.webContents.send('topic:getTopics', 'Error');
    }
  }, 3000);
};

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
      // Push a promise from call to getCurrentMsgCount with the arguments of host, topic, and ith-partition number into array
      promises.push(adminApi.getPartitionMsgCount(kafkaHostURI, topicName, i));
    }
    // Resolve promise when promise all resolves all promises from array sending back a single number
    Promise.all(promises)
      .then(partitionMsgsCount => {
        const topicMsgsCount = partitionMsgsCount.reduce((total, curr) => (total += curr), 0);
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
 * This function will return a promise which will resolve to the number of messages in a specific partition
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
 * @param {Object} mainWindow Electron window to send resulting data to
 *
 * This function returns data to the renderer process. Calls getLatestOffset and getCurrentMsgCount then sends back the result
 * as an object containing highwaterOffset and messageCount as properties.
 */
adminApi.getPartitionData = (kafkaHostURI, topicName, partitionId = 0, mainWindow) => {
  const data = [];

  // DATA NEEDED: 1. Highwater Offset; 2. Total message count; 3. Current message in buffer(?)
  // 1. Determine current highwater offset
  data[0] = offsetApi.getLatestOffset(kafkaHostURI, topicName, partitionId);
  // 2. Call getCurrentMsgCount to get current message count
  data[1] = offsetApi.getPartitionMsgCount(kafkaHostURI, topicName, partitionId);
  // 3. Maybe get current message in buffer (?????)

  Promise.all(data)
    .then(result => {
      mainWindow.webContents.send('partition:getData', {
        highwaterOffset: result[0],
        msgCount: result[1]
      });
    })
    .catch(err => console.error(err));
};

module.exports = adminApi;
