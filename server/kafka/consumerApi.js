const kafka = require('kafka-node');

// const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
// const consumer = new kafka.Consumer(client, [{ topic: 'test1' }]);
let testStream;

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

const getMessagesFromPartition = async (
  kafkaHost,
  topic,
  mainWindow,
  offset = 0,
  partition = 0
) => {
  // Send back test data
  if (topic === 'test1' && broker === 'asdf') {
    let testOffset = 45532;
    let testHighwater = 45702;
    testStream = setInterval(() => {
      mainWindow.webContents.send('partition:getMessages', {
        topic: 'test1',
        value: `Current date: ${Date.now()}`,
        offset: testOffset,
        partition: 0,
        highWaterOffset: testHighwater,
        key: null,
      });
    }, 1500);
    testOffset += 1;
    testHighwater += 1;
  } else {
    const client = new kafka.KafkaClient({ kafkaHost });
    const payload = [{ topic, partition }];
    if (offset === 'latest') {
      payload.offset = await getLatestOffset(kafkaHost, topic, partition);
    }
    const options = { encoding: 'utf8', keyEncoding: 'utf8' };
    // creating new consumer instance
    const consumer = new kafka.Consumer(client, payload);

    console.log('MADE IT INTO CONSUMER API, THIS PAYLOAD: ', payload);

    consumer.on('error', err => {
      mainWindow.webContents.send('error:getMessage', {});
    });

    // consumer listens for msg event and passes msg to mainWindow
    consumer.on('message', message => {
      console.log(message);
      mainWindow.webContents.send('partition:getMessages', message);
    });
  }
};

const stopDataFlow = () => {
  clearInterval(testStream);
};

module.exports = { getMessagesFromPartition, stopDataFlow };
