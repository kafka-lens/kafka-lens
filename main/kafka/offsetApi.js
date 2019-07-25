const kafka = require('kafka-node');

const offsetApi = {};

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} partitionId Partition number of topic
 *
 * This function will return a promise. Fetches the earliest/lowest offset from Kafka broker.
 * Will resolve the number of the earliest offset in the topic partition.
 */
offsetApi.getEarliestOffset = (kafkaHostURI, topicName, partitionId) => {
  console.log(`invoking getEarliestOffset for topic ${topicName} - partition ${partitionId}`);
  const { client, offset } = getOffsetAndClient(kafkaHostURI);

  return new Promise((resolve, reject) => {
    offset.fetchEarliestOffsets([topicName], (err, data) => {
      client.close();
      if (err) return reject(err);
      console.log(
        `result from getEarliestOffset for topic ${topicName} - partition ${partitionId}:`,
        data
      );
      resolve(data[topicName][partitionId]);
    });
  });
};

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} partitionId Partition number of topic
 *
 * This function will return a promise. Fetches the latest/highwater offset from Kafka broker.
 * Will resolve the number of the latest offset in the topic partition.
 */
offsetApi.getLatestOffset = (kafkaHostURI, topicName, partitionId) => {
  console.log(`invoking getLatestOffset for topic ${topicName} - partition ${partitionId}`);
  const { client, offset } = getOffsetAndClient(kafkaHostURI);

  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets([topicName], (err, data) => {
      client.close();
      if (err) reject(err);
      else {
        console.log(
          `result from getLatestOffset for topic ${topicName} - partition ${partitionId}:`,
          data
        );
        resolve(data[topicName][partitionId]);
      }
    });
  });
};

function getOffsetAndClient(kafkaHostURI) {
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
  return { client, offset: new kafka.Offset(client) };
}

module.exports = offsetApi;
