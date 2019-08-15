const offsetApi = require('../offsetApi');

describe('offsetApi unit tests', () => {
  const args = {
    kafkaHostURI: 'k2.tpw.made.industries:9092',
    topicName: 'swipes',
    partitionId: 0,
  };

  describe('Testing getEarliestOffset', () => {
    it('Should return a number', async () => {
      const data = await offsetApi.getEarliestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
      expect(typeof data).toBe('number');
    });
  });

  describe('Testing getLatestOffset', () => {
    let data;

    beforeAll(async () => {
      data = await offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
    });

    it('Should return a number', async () => {
      // const data = await offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
      expect(typeof data).toBe('number');
    });

    it('Should return a number', async () => {
      // const data = await offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
      expect(typeof data).toBe('number');
    });
  });
});
