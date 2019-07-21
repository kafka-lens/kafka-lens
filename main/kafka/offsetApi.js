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
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchEarliestOffsets([topicName], (err, data) => {
      if (err) reject(err);
      else {
        // console.log('earliet offset data:', data);
        resolve(data[topicName][partitionId]);
      }
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
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHostURI });
  const offset = new kafka.Offset(client);
  return new Promise((resolve, reject) => {
    offset.fetchLatestOffsets([topicName], (err, data) => {
      if (err) reject(err);
      else {
        // console.log('latest offset data:', data);
        resolve(data[topicName][partitionId]);
      }
    });
  });
};

module.exports = offsetApi;