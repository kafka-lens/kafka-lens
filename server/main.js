const kafka = require('kafka-node');

function buildTopicObj(topic, partition, offset) {
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

const getTopicData = (event, args) => {
  const client = new kafka.KafkaClient({ kafkaHost: args });
  const admin = new kafka.Admin(client);
  admin.listTopics((err, topics) => {
    if (err) console.error(err);
    topics = topics[1].metadata;
    const resultTopic = [];
    Object.keys(topics).forEach(topic => {
      const topicPartitions = Object.keys(topics[topic]).length;
      resultTopic.push(buildTopicObj(topic, topicPartitions, getCurrentOffset(topic, client)));
    });
    return resultTopic;
  });
};

module.exports = { getTopicData };
