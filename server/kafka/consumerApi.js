const kafka = require('kafka-node');

// const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
// const consumer = new kafka.Consumer(client, [{ topic: 'test1' }]);
let testStream;

const getMessagesFromTopic = (broker, topic, mainWindow) => {
  // Send back test data
  if (topic === 'test1' && broker === 'asdf') {
    let testOffset = 45532
    let testHighwater = 45702
    testStream = setInterval(() => {
      mainWindow.webContents.send('partition:getMessages', { topic: 'test1',
      value: `Current date: ${Date.now()}`,
      offset: testOffset,
      partition: 0,
      highWaterOffset: testHighwater,
      key: null })
    }, 1500)
    testOffset += 1;
    testHighwater += 1;
  }
}

const stopDataFlow = () => {
  clearInterval(testStream);
}

module.exports={getMessagesFromTopic, stopDataFlow}