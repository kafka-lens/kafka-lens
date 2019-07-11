const kafka = require('kafka-node');
const zookeeper = require('node-zookeeper-client');
const offsetApi = require('../kafka/offsetApi.js')

const brokerApi = {};
let lastOffset = 0;

// brokerApi.getMsgsPerSec = (lastOffset, kafkaHostURI, topicName, partitionId) => {
//   return new Promise((resolve, reject) => {
//     const newOffset = offsetApi.getLatestOffset(kafkaHostURI, topicName, partitionId)
//     .then()
//     const msgsSinceLastOffset = newOffset -;
//     lastOffset = newOffset;
//   })

//   return Math.floor(msgsSinceLastOffset/5);
// }

/**
 * @param {String} kafkaHostURI URI of Kafka broker(s)
 * @param {String} topicName Single topic to lookup
 * @param {Number} partitionId Topic partition number. Defaults to 0
 *
 * This function will check with the Zookeeper API to see if a specific broker is alive
 */
brokerApi.checkBrokerActive = brokerId => {
  //Create connection with zookeeper API and instruct it to invoke brokerApi.checkBrokerActive when connected
  const zookeeperClient = zookeeper.createClient('localhost:2181');
  const brokerPath = 'brokers/id/' + brokerId;

  function exists(client, path) {
    client.exists(
      path,
      function(event) {
        console.log('Got event: %s.', event);
        exists(client, path);
      },
      function(error, stat) {
        if (error) {
          console.log('Failed to check existence of node: %s due to: %s.', path, error);
          return;
        }

        if (stat) {
          console.log('Node: %s exists and its version is: %j', path, stat.version);
          return true;
        } else {
          console.log('Node %s does not exist.', path);
          return false;
        }
      }
    );
  }

  zookeeperClient.once('connected', function() {
    console.log('Connected to ZooKeeper.');
    exists(zookeeperClient, brokerPath);
  });

  zookeeperClient.connect();
};

brokerApi.getBrokerData = (kafkaHostURI, mainWindow) => {
  console.log('attempting connection to', kafkaHostURI);
  try {
    // Declares a new instance of client that will be used to make a connection
    const client = new kafka.KafkaClient({ kafkaHostURI });
    // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
    const admin = new kafka.Admin(client);
    const brokerResult = {};
    let isRunning = false;

    // Fetch all topics from the Kafka broker
    admin.listTopics((err, data) => {
      if (err) console.error(err); // TODO: Handle listTopics error properly
      // Reassign topics with only the object containing the topic data
      //console.log('brokerMetadata IN BROKER API:', data[0]);
      const brokerMetadata = data[0];
      const topicsMetadata = data[1].metadata;

      isRunning = true;
      console.log('Object Entries of brokerMetadata', Object.entries(brokerMetadata));

      Object.entries(brokerMetadata).forEach(([broker, brokerData]) => {
        console.log(brokerData);
        brokerResult[broker] = {
          brokerId: brokerData.nodeId,
          brokerURI: brokerData.port,
          topics: [],
          isAlive: true
        };
      });

      Object.entries(topicsMetadata).forEach(([topicName, topic]) => {
        if (topicName === '__consumer_offsets') return;
        // for each topic, find associated broker and add topic name to topic array in brokerResults
        const associatedBrokers = new Set();
        Object.values(topic).forEach(partition => {
          console.log(partition);
          associatedBrokers.add(...partition.replicas)
        });
        
        associatedBrokers.forEach(id => {
          if (!brokerResult[id]) {
            brokerResult[id] = {
              brokerId: id,
              brokerURI: 'Unknown',
              topics: [],
              isAlive: false
            };
          }
          brokerResult[id].topics.push({topicName: topicName, messagesPerSecond: 'num'});
        });
      });
      console.log('brokerResult:', brokerResult);
      mainWindow.webContents.send('broker:getBrokers', { data: brokerResult });
    });
  } catch (error) {
    mainWindow.webContents.send('broker:getBrokers', { error });
  }
};

module.exports = brokerApi;
