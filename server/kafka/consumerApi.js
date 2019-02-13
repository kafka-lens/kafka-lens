const kafka = require('kafka-node');

// const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
// const consumer = new kafka.Consumer(client, [{ topic: 'test1' }]);
let testStream;

const getLatestOffset = (kafkaHost, topic, partition) => {
  const client = new kafka.KafkaClient({ kafkaHost });
  const admin = new kafka.Admin(client);
  const result = admin.getLatestOffset(client, topic, partition);
  console.log('result from latest offset in consumer: ', result);
  return result;
};

const getMessagesFromPartition = (
  kafkaHost,
  topic,
  mainWindow,
  offset = getLatestOffset(topic),
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
    });
    testOffset += 1;
    testHighwater += 1;
  } else {
    const client = new kafka.KafkaClient({ kafkaHost });
    const payload = { topic, offset, partition };
    const options = { encoding: 'utf8', keyEncoding: 'utf8' };
    const consumerStream = new kafka.consumerStream(client, payload, options);

    consumerStream.on('error', err => {
      mainWindow.webContents.send('error:getMessage', {});
    });

    consumerStream.on('message', message => {
      mainWindow.webContents.send('partition:getMessages', message);
    });
  }
};

const stopDataFlow = () => {
  clearInterval(testStream);
};

module.exports = { getMessagesFromTopic: getMessagesFromPartition, stopDataFlow };
