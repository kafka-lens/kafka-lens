const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: '157.230.166.35:9092' });
const admin = new kafka.Admin(client);

admin.listTopics((err, moo) => {
  if (err) console.error(err);
  console.log(JSON.stringify(moo, null, 1));
});

const resource = {
  resourceType: admin.RESOURCE_TYPES.topic, // 'broker' or 'topic'
  resourceName: 'test1',
  configNames: [] // specific config names, or empty array to return all,
};

const payload = {
  resources: [resource],
  includeSynonyms: false // requires kafka 2.0+
};

admin.describeConfigs(payload, (err, moo) => {
  if (err) console.error(err);
  console.log(JSON.stringify(moo, null, 1));
});
