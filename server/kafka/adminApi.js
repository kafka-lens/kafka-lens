const kafka = require('kafka-node');

const adminApi = {}

function buildTopicObj(topic, partition, messages) {
  return {
    topic,
    partition,
    messages,
  };
}

adminApi.getCurrentMsgCount = (kafkaHost, topic, ) => {
  const promises = [];
  return new Promise ((resolve, reject) => {
    promises.push(getEarliestOffset(kafkaHost, topic));
    promises.push(getLatestOffset(kafkaHost, topic));
    Promise.all(promises).then(offsets => {
      resolve(offsets[1] - offsets[0]);
    }).catch(error => {
      reject(error);
    })
  })
}

adminApi.getTopicMsgCount = (kafkaHost, topic, partition) => {
  // Iterate through the number of partitions
  // In each iteration, 
}

adminApi.getEarliestOffset = (kafkaHost, topic) => {
  const client = new kafka.KafkaClient({ kafkaHost });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchEarliestOffsets(topic, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

adminApi.getLatestOffset = (kafkaHost, topic) => {
  const client = new kafka.KafkaClient({ kafkaHost });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets(topic, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

adminApi.getTopicData = (kafkaHost, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHost });
  const admin = new kafka.Admin(client);
  const resultTopic = [];
  let isRunning = false;
  console.log(kafkaHost);

  admin.listTopics((err, topics) => {
    if (err) console.error(err);
    topics = topics[1].metadata;
    Object.keys(topics).forEach(topic => {
      isRunning = true;
      const topicPartitions = Object.keys(topics[topic]).length;
      resultTopic.push(
        buildTopicObj(topic, topicPartitions, getCurrentMsgCount(kafkaHost, [topic]))
      );
    });
    Promise.all(resultTopic.map(x => x.messages)).then(() => {
      console.log(resultTopic);
      mainWindow.webContents.send('topic:getTopics', resultTopic);
    });
  });
  setTimeout(() => {
    if (!isRunning) {
      mainWindow.webContents.send('topic:getTopics', 'Error');
    }
  }, 3000);
}

adminApi.getPartitionData = (kafkaHost, topic, mainWindow) => {
  const client = new kafka.KafkaClient({ kafkaHost });
  const admin = new kafka.Admin(client);
  const partitions = [];
  const testData = [
    { partition: 1, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 2, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
    { partition: 3, broker: 'test.data:9092', currentOffset: 99999, msgCount: 99999 },
  ];
  if (topic === 'asdf') return testData;
};

module.exports = adminApi;
