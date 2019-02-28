import adminApi from '../adminApi';

xdescribe('adminApi unit tests', () => {
  const args = {
    kafkaHost: 'k2.tpw.made.industries:9092',
    topic: 'swipes',
    partition: 0
  };
  describe('Testing getEarliestOffset', () => {
    it('Should return a number', () => {
      adminApi.getEarliestOffset(args.kafkaHost, args.topic, args.partition).then(num => {
        expect(typeof num).toEqual('number');
      });
    });
  });
  describe('Testing getLatestOffset', () => {
    it('Should return a number', () =>
      adminApi.getLatestOffset(args.kafkaHost, args.topic, 2).then(num => {
        expect(typeof num).toEqual('number');
      }));
  });
  describe('Testing getCurrentMsgCount', () => {
    it('Should return a number', () =>
      adminApi
        .getCurrentMsgCount(args.kafkaHost, args.topic, 2)
        .then(num => {
          console.log('Returned', num);
          expect(typeof num).toEqual('number');
        })
        .catch(err => expect(err).toEqual(null)));
  });
  describe('Testing getTopicMsgCount', () => {
    it('Should return a number', () =>
      adminApi.getTopicMsgCount(args.kafkaHost, args.topic, 2).then(num => {
        expect(typeof num).toEqual('number');
      }));
  });
});
