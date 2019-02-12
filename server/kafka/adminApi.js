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
  const offset = new kafka.Offset(client);
  return offset.fetchLatestOffsets([topic], (err, result) =>
    Object.values(result[topic]).reduce((total, curr) => total + curr)
  );
}

module.exports = { getTopicData };
