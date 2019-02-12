const kafka = require('kafka-node');

function buildTopicObj(topic, partition, messages) {
  return {
    topic,
    partition,
    messages
  };
}

function getCurrentMsgCount(topic, client) {
  console.log('Doing getCurrentMsgCount');
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets([topic], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.values(result[topic]).reduce((total, curr) => total + curr));
      }
    });
  });
}

const getTopicData = async (uri, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHost: uri });
  const admin = new kafka.Admin(client);
  const resultTopic = [];
  admin.listTopics((err, topics) => {
    if (err) console.error(err);
    topics = topics[1].metadata;
    Object.keys(topics).forEach(topic => {
      isRunning = true;
      const topicPartitions = Object.keys(topics[topic]).length;
      resultTopic.push(buildTopicObj(topic, topicPartitions, getCurrentMsgCount(topic, client)));
    });
    Promise.all(resultTopic.map(x => x.messages)).then(result => {
      console.log(resultTopic);
      mainWindow.webContents.send('topic:getTopics', resultTopic);
    });
  });
};

module.exports = { getTopicData };
