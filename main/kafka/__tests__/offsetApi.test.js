const offsetApi = require('../offsetApi');

describe('offsetApi unit tests', () => {
  const args = {
    kafkaHostURI: 'k2.tpw.made.industries:9092',
    topicName: 'swipes',
    partitionId: 0,
  };

  describe('Testing getEarliestOffset', () => {
    it('Should return a number', () => {
      offsetApi.getEarliestOffset(args.kafkaHostURI, args.topicName, args.partitionId)
        .then((data) => expect(typeof data).toBe('number'));
    });
  });

  describe('Testing getLatestOffset', () => {
    it('Should return a number', () => {
      offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId)
        .then((data) => expect(typeof data).toBe('number'));
    });
  });
});
