const kafka = require('kafka-node');
/**
 *
 * @param {String} topic
 * @param {Number} partition
 * @param {Number} messages
 *
 * Will receive from get topic data the parameters and will return an obj with topic, partition, and messages
 */
function buildTopicObj(topic, partition, messages) {
  return {
    topic,
    partition,
    messages
  };
}

function getCurrentMsgCount(topic, client) {
  console.log('Doing getCurrentMsgCount');
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets([topic], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.values(result[topic]).reduce((total, curr) => total + curr));
      }
    });
  });
}
/**
 *
 * @param {String} uri the connection uri that the user types into connection input
 * @param {Electron Window} mainWindow Main window that gets data
 *
 * Makes a connection to Kafka server to fetch a list of topics
 * Transforms the data coming back from the Kafka broker into pertinent data to send back to client
 *
 *
 */
const getTopicData = (uri, mainWindow) => {
  // Declares a new instance of client that will be used to make a connection
  const client = new kafka.KafkaClient({ kafkaHost: uri });
  // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
  const admin = new kafka.Admin(client);
  const resultTopic = [];
  let isRunning = false;

  admin.listTopics((err, topics) => {
    if (err) console.error(err);
    topics = topics[1].metadata;
    isRunning = true;
    Object.keys(topics).forEach(topic => {
      // for each topic, get # of partitions and storing that in topic partitions
      const topicPartitions = Object.keys(topics[topic]).length;
      resultTopic.push(buildTopicObj(topic, topicPartitions, getCurrentMsgCount(topic, client)));
    });
    // gets number of messages and waits for promise to resolve before sending the topics to client
    Promise.all(resultTopic.map(x => x.messages)).then(result => {
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

const getPartitionData = (uri, topic, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHost: uri });
  const admin = new kafka.Admin(client);
  const partitions = [];
  const testData = [
    { partition: 1, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 2, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 3, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 }
  ];
  if (topic === 'asdf') return testData;
};

module.exports = { getTopicData, getPartitionData, buildTopicObj };
