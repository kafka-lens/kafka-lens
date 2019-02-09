const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
const admin = new kafka.Admin(client);
const Producer = kafka.Producer;
const producer = new Producer(client, {
  // Configuration for when to consider a message as acknowledged, default 1
  requireAcks: 1,
  // The amount of time in milliseconds to wait for all acks before considered, default 100ms
  ackTimeoutMs: 100,
  // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
  partitionerType: 2
});

function sendPayload(payload) {
  producer.send(payload, (err, data) => {
    if (err) console.error(err);
    console.log(data);
  });
}

function createPayload(topic) {
  return [{ topic, messages: `Current date: ${Date.now()}` }];
}

admin.listTopics((err, moo) => {
  if (err) console.error(err);
  const topics = Object.keys(moo[1].metadata);
  if (topics.indexOf('test1') === -1) {
    const topic = [
      {
        topic: 'test1',
        partitions: 1,
        replicationFactor: 1
      }
    ];
    admin.createTopics(topic, (topicErr, result) => {
      if (topicErr) console.error(err);
      console.log('create topic result: ', result);
    });
  }
  if (topics.indexOf('test2') === -1) {
    const topic = [
      {
        topic: 'test2',
        partitions: 1,
        replicationFactor: 1
      }
    ];
    admin.createTopics(topic, (topicErr, result) => {
      if (topicErr) console.error(err);
      console.log('create topic result: ', result);
    });
  }
});

producer.on('ready', () => {
  setInterval(() => {
    sendPayload(createPayload('test1'));
  }, 5);
  // setInterval(() => {
  //   sendPayload(createPayload('test2'));
  // }, 750);
  console.log('producer ready');
});
