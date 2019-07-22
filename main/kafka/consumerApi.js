const kafka = require('kafka-node');
const MessageBuffer = require('./MessageBuffer');

// const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI: '157.230.166.35:9092' });
//const Consumer = new kafka.Consumer;
let testStream;

const getMessagesFromTopic = async (kafkaHostURI, topicName, mainWindow) => {
  // Send back test data
  const buffer = new MessageBuffer(1000);
  let hasData = false;
  let lastChecked = Date.now();
  console.log('consumerAPI getMessagesFromTopic "topicName":', topicName)
  let consumerGroup = new kafka.ConsumerGroup(
    {
      kafkaHost: kafkaHostURI,
      groupId: 'testingLab1',
      fromOffset: 'earliest',
      outOfRangeOffset: 'earliest'
    },
    topicName
  );
  consumerGroup.connect();
  consumerGroup
    .on('message', message => {
      const formatedMessage = {
        value: message.value.toString('utf8'),
        topicName: message.topic,
        partitionId: message.partition,
        key: message.key,
        offset: message.offset,
        timestamp: message.timestamp,
      }
      console.log('message:', message);
      console.log('formatedMessage:', formatedMessage);
      hasData = Date.now();
      buffer.queue(formatedMessage);
    });
  const sendBuffer = setInterval(() => {
    if (lastChecked < hasData) {
      lastChecked = Date.now();
      buffer.getNextSegment(mainWindow);
    }
  }, 50);
  return { consumerGroup, sendBuffer };
};

const stopDataFlow = () => {
  clearInterval(testStream);
};

module.exports = { getMessagesFromTopic, stopDataFlow };
