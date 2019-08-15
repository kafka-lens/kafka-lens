const kafka = require('kafka-node');
const MessageBuffer = require('./MessageBuffer');
const logger = require('../utils/logger');


// const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI: '157.230.166.35:9092' });
// const Consumer = new kafka.Consumer;

const consumerApi = {};

consumerApi.getMessagesFromTopic = (kafkaHostURI, topicName, mainWindow, partitionId) => {
  // Send back test data
  const buffer = new MessageBuffer(1000);
  let hasData = false;
  let lastChecked = Date.now();
  logger.log('consumerAPI getMessagesFromTopic "topicName":', topicName);
  const consumerGroup = new kafka.ConsumerGroup(
    {
      kafkaHost: kafkaHostURI,
      groupId: 'testingLab2',
      fromOffset: 'latest',
      outOfRangeOffset: 'latest',
    },
    topicName,
  );

  consumerGroup.connect();
  consumerGroup
    .on('message', (message) => {
      const formattedMessage = {
        value: message.value.toString('utf8'),
        topicName: message.topic,
        partitionId: message.partition,
        key: message.key,
        offset: message.offset,
        timestamp: message.timestamp || 'None',
      };
      logger.log('message:', message);
      logger.log('formattedMessage:', formattedMessage);
      hasData = Date.now();
      logger.log(`message.partition: ${formattedMessage.partitionId}, partitionId: ${partitionId}`);
      if (typeof partitionId !== 'number' || partitionId === formattedMessage.partitionId) {
        buffer.queue(formattedMessage);
      }
    });

  const sendBufferIntervalId = setInterval(() => {
    if (lastChecked < hasData) {
      lastChecked = Date.now();
      buffer.getNextSegment(mainWindow);
    }
  }, 50);

  return () => {
    logger.log(`
      shutting down consumerGroup for topic ${topicName} - memberId ${consumerGroup.memberId}
     `);
    clearInterval(sendBufferIntervalId);
    consumerGroup.close((err) => {
      if (err) logger.log('error closing consumerGroup connection:', err);
      else logger.log('consumerGroup connection successfully shut down');
    });
  };
};

module.exports = consumerApi;
