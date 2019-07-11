const kafka = require('kafka-node');
const zookeeper = require('node-zookeeper-client');
const offsetApi = require('../kafka/offsetApi.js')

const brokerApi = {};


const topics = {
  topic: {
    partition: {
      lastOffset: 245,
      timeStamp: Date.now(),
      msgRatePerSecond: 203,
      leader: 1, 
    }
  }
}

brokerApi.getMsgsPerSecond = (kafkaHostURI, topicName, partitionId, leader) => {
  // initialize in case of new topic / partition
  const topic = topics[topicName] || {};
  const partition = topic[partitionId] || {};
  partition.leader = leader;

  return new Promise((resolve, reject) => {
    offsetApi.getLatestOffset(kafkaHostURI, topicName, partitionId)
      .then(newOffset => {
        const currentTime = Date.now();
        if (partition.timeStamp === undefined) {
          partition.lastOffset = newOffset;
          partition.timeStamp = currentTime;
          partition.msgRatePerSecond = null;
          return resolve(0);
        }

        const newMsgsAmount = newOffset - partition.lastOffset;
        const elapsedTimeInSeconds = (currentTime - partition.timeStamp) / 1000;
        
        partition.msgRatePerSecond = Math.floor(newMsgsAmount/elapsedTimeInSeconds)
        partition.lastOffset = newOffset;
        partition.timeStamp = currentTime;
        return resolve(partition.msgRatePerSecond);
      })
      .catch(err => reject(err));
  })

}

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


/**
 * Returned info from listTopics:
 * [
 *   {  // Only brokers that are alive
 *     brokerId: {
 *       nodeId: brokerId (0),
 *       host: systemName - or something like this... ('robot-boyfriend' | 'ubuntu' | ...),
 *       port: brokerPort (9092),
 *     }
 *   },
 *   {
 *     metadata: {
 *       topicName: {
 *         partitionId: {
 *           topic: topicName ('third'),
 *           partition: partitionId (1),
 *           leader: brokerId (0),
 *           replicas: brokerId[] ([1, 2]),
 *           isr: brokerId[] ([1]),
 *         }
 *       }      
 *     }
 *   }
 * ]
 * 
 * @returns {{
 *         brokerId: Number,
 *         brokerURI: Number,
 *         topics: [],
 *         isAlive: Boolean,
 *       }} object of this type of objects
 */
brokerApi.getBrokerData = (kafkaHostURI, mainWindow) => {
  console.log('attempting connection to', kafkaHostURI);
  try {
    // Declares a new instance of client that will be used to make a connection
    const client = new kafka.KafkaClient({ kafkaHostURI });
    // Declaring a new kafka.Admin instance creates a connection to the Kafka admin API
    const admin = new kafka.Admin(client);
    const brokerResult = {};

    // Fetch all topics from the Kafka broker
    admin.listTopics((err, data) => {
      if (err) console.error(err); // TODO: Handle listTopics error properly
      // Reassign topics with only the object containing the topic data
      //console.log('brokerMetadata IN BROKER API:', data[0]);
      const brokerMetadata = data[0];
      const topicsMetadata = data[1].metadata;

      console.log('Object Entries of brokerMetadata', Object.entries(brokerMetadata));

      Object.entries(brokerMetadata).forEach(([broker, brokerData]) => {
        console.log('brokerData:', brokerData);
        brokerResult[broker] = {
          brokerId: brokerData.nodeId,
          brokerURI: brokerData.port,
          topics: [],
          isAlive: true
        };
      });

      Object.entries(topicsMetadata).forEach(([topicName, topic]) => {
        const getMsgsPerSecondPromises = [];

        if (topicName === '__consumer_offsets') return;
        // for each topic, find associated broker and add topic name to topic array in brokerResults
        const associatedBrokers = new Set();
        Object.values(topic).forEach(partition => {
          console.log('partition:', partition);
          associatedBrokers.add(...partition.replicas)

          getMsgsPerSecondPromises.push(brokerApi.getMsgsPerSecond(kafkaHostURI, topicName, partition.partition, partition.leader));
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
          brokerResult[id].topics.push({topicName: topicName, newMessagesPerSecond: null});
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
