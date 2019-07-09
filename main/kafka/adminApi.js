const kafka = require('kafka-node');

const adminApi = {};

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
    promises.push(adminApi.getEarliestOffset(kafkaHostURI, topicName, partitionId));
    promises.push(adminApi.getLatestOffset(kafkaHostURI, topicName, partitionId));
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
 * @param {partition} partitionId Partition number of topic
 *
 * This function will return a promise. Fetches the earliest/lowest offset from Kafka broker.
 * Will resolve the number of the earliest offset in the topic partition.
 */
adminApi.getEarliestOffset = (kafkaHostURI, topicName, partitionId) => {
  console.log('Inside adminApi.getEarlistOffset');
  const client = new kafka.KafkaClient({ kafkaHostURI });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchEarliestOffsets([topicName], (err, data) => {
      if (err) reject(err);
      else{
        console.log('earliet offset data:', data)
        resolve(data[topicName][partitionId]);
      }
    });
  });
};

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {partition} partitionId Partition number of topic
 *
 * This function will return a promise. Fetches the latest/highwater offset from Kafka broker.
 * Will resolve the number of the latest offset in the topic partition.
 */
adminApi.getLatestOffset = (kafkaHostURI, topicName, partitionId) => {
  console.log('Inside adminApi.getLatestOffset');
  const client = new kafka.KafkaClient({ kafkaHostURI });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets([topicName], (err, data) => {
      if (err) reject(err);
      else {
        console.log('latest offset data:', data)
        resolve(data[topicName][partitionId]);
      }
    });
  });
};

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
  const resultTopic = [];
  let isRunning = false;
  console.log(kafkaHostURI);

  // Fetch all topics from the Kafka broker
  admin.listTopics((err, data) => {
    if (err) console.error(err);  // TODO: Handle listTopics error properly
    // Reassign topics with only the object containing the topic data
    console.log('data response from server:', data)
    topicsMetadata = data[1].metadata;
    console.log('topics metadata:', topicsMetadata)

    isRunning = true;

    Object.entries(topicsMetadata).forEach(([topicName, topic]) => {
      // for each topic, get # of partitions and storing that in topic partitions
      const numberOfPartitions = Object.keys(topic).length;
      resultTopic.push({
        topic: topicName,
        partition: numberOfPartitions,
        messages: adminApi.getTopicMsgCount(kafkaHostURI, topicName, numberOfPartitions)
      });
    });

    const promises = resultTopic.map(x => x.messages);

    Promise.all(promises)
      .then(() => {
        console.log(resultTopic);
        mainWindow.webContents.send('topic:getTopics', resultTopic);
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
 * @param {String} topic Single topic to lookup
 * @param {Number} partition Topic partition number. Defaults to 0
 * @param {Object} mainWindow Electron window to send resulting data to
 *
 * This function returns data to the renderer process. Calls getLatestOffset and getCurrentMsgCount then sends back the result
 * as an object containing highwaterOffset and messageCount as properties.
 */
adminApi.getPartitionData = (kafkaHostURI, topic, partition = 0, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHostURI });
  const admin = new kafka.Admin(client);
  const data = [];
  const testData = [
    { partition: 1, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 2, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 3, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 }
  ];
  if (topic === 'asdf') return testData;

  // DATA NEEDED: 1. Highwater Offset; 2. Total message count; 3. Current message in buffer(?)
  // 1. Determine current highwater offset
  data[0] = adminApi.getLatestOffset(kafkaHostURI, topic, partition);
  // 2. Call getCurrentMsgCount to get current message count
  data[1] = adminApi.getPartitionMsgCount(kafkaHostURI, topic, partition);
  // 3. Maybe get current message in buffer (?????)

  Promise.all(data)
    .then(result => {
      mainWindow.webContents.send('partition:getData', {
        highwaterOffset: result[0],
        messageCount: result[1]
      });
    })
    .catch(err => console.error(err));
};

module.exports = adminApi;
