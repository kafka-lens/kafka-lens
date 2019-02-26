const kafka = require('kafka-node');
const bkafka = require('node-rdkafka');

// const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
// const consumer = new kafka.Consumer(client, [{ topic: 'test1' }]);
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
  const consumer = new bkafka.KafkaConsumer({
    'group.id': 'kafkalens',
    'metadata.broker.list': kafkaHost,
  });
  consumer.connect();
  consumer
    .on('ready', () => {
      consumer.subscribe([topic]);
      setInterval(() => {
        consumer.consume(25);
      }, 250);
    })
    .on('data', data => {
      data.value = data.value.toString('utf8');
      // console.log('message', data);
      mainWindow.webContents.send('partition:getMessages', data);
    });
  return consumer;
};

const stopDataFlow = () => {
  clearInterval(testStream);
};

module.exports = { getMessagesFromTopic, stopDataFlow };
