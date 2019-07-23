const kafka = require('kafka-node');
const MessageBuffer = require('./MessageBuffer');

// const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI: '157.230.166.35:9092' });
//const Consumer = new kafka.Consumer;

const consumerApi = {};

consumerApi.getMessagesFromTopic = (kafkaHostURI, topicName, mainWindow, partitionId) => {
  // Send back test data
  const buffer = new MessageBuffer(1000);
  let hasData = false;
  let lastChecked = Date.now();
  console.log('consumerAPI getMessagesFromTopic "topicName":', topicName)
  let consumerGroup = new kafka.ConsumerGroup(
    {
      kafkaHost: kafkaHostURI,
      groupId: 'testingLab2',
      fromOffset: 'latest',
      outOfRangeOffset: 'latest'
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
        timestamp: message.timestamp || 'None',
      }
      console.log('message:', message);
      console.log('formatedMessage:', formatedMessage);
      hasData = Date.now();
      console.log(`message.partition: ${message.partition}, partitionId: ${partitionId}`);
      if(typeof partitionId !== 'number' || partitionId === formatedMessage.partitionId){
        buffer.queue(formatedMessage);
      }
    });

  const sendBufferIntervalId = setInterval(() => {
    if (lastChecked < hasData) {
      lastChecked = Date.now();
      buffer.getNextSegment(mainWindow);
    }
  }, 50);

  const shutdownConsumerGroup = () => {
    console.log(`shutting down consumerGroup for topic ${topicName} - memberId ${consumerGroup.memberId}`)
    clearInterval(sendBufferIntervalId);
    consumerGroup.close((err) => {
      if (err) console.log('error closing consumerGroup connection:', err);
      else console.log('consumerGroup connection successfully shut down');
    });
  }

  return shutdownConsumerGroup;
};

module.exports = consumerApi;
