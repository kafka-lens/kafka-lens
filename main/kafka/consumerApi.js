const kafka = require('kafka-node');
const rdkafka = require('node-rdkafka');
const MessageBuffer = require('./MessageBuffer');

// const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
//const Consumer = new kafka.Consumer;
let testStream;

// Not in use
const getLatestOffset = (kafkaHost, topic, partition) =>
  new Promise((resolve, reject) => {
    const client = new kafka.KafkaClient({ kafkaHost });
    const offset = new kafka.Offset(client);
    offset.fetchLatestOffsets([{ topic, partition }], (err, data) => {
      if (err) reject(err);
      console.log('result from latest offset in consumer: ', data);
      resolve(data);
    });
  });

const getMessagesFromTopic = async (kafkaHost, topic, mainWindow) => {
  // Send back test data
  const buffer = new MessageBuffer(1000);
  let hasData = false;
  let lastChecked = Date.now();
  console.log('consumerAPI getMessagesFromTopic "topic":', topic)
  // const consumer = new rdkafka.KafkaConsumer({
  //   'group.id': 'kafkalens',
  //   'metadata.broker.list': kafkaHost,
  // });
  let consumerGroup = new kafka.ConsumerGroup(
    {
      kafkaHost: kafkaHost,
      groupId: 'testingLab1',
      fromOffset: 'earliest',
      outOfRangeOffset: 'earliest'
    },
    topic
  );
  consumerGroup.connect();
  consumerGroup
    // .on('ready', () => {
    //   consumerGroup.subscribe([topic]);
    //   setInterval(() => {
    //     consumerGroup.consume(25);
    //   }, 1500);
    //   consumerGroup.consume();
    // })
    .on('message', message => {
      message.value = message.value.toString('utf8');
      console.log('message', message);
      //mainWindow.webContents.send('partition:getMessages', message);
      hasData = Date.now();
      buffer.queue(message);
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

module.exports = { getMessagesFromTopic, stopDataFlow, getLatestOffset };
