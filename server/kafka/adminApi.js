const kafka = require('kafka-node');

function buildTopicObj(topic, partition, offset) {
  // console.log({ topic, partition, offset });
  return {
    topic,
    partition,
    offset
  };
}

function getCurrentOffset(topic, client) {
  console.log('Doing getCurrentOffset');
  const offset = new kafka.Offset(client);
  return offset.fetchLatestOffsets([topic], (err, result) =>
    Object.values(result[topic]).reduce((total, curr) => total + curr)
  );
}

const getTopicData = (uri, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHost: uri });
  const admin = new kafka.Admin(client);
  const resultTopic = [];
  admin.listTopics((err, topics) => {
    if (err) console.error(err);
    topics = topics[1].metadata;
    Object.keys(topics).forEach(topic => {
      const topicPartitions = Object.keys(topics[topic]).length;
      resultTopic.push(buildTopicObj(topic, topicPartitions, 'offset'));
    });
    console.log('result topic arrrrrrr: ', resultTopic);
    mainWindow.webContents.send('topic:getTopics', resultTopic);
  });
};

module.exports = { getTopicData };
