import adminApi from '../adminApi';

describe('adminApi unit tests', () => {
  const args = {
    kafkaHost: 'k2.tpw.made.industries:9092',
    topic: 'swipes',
    partition: 0
  };
  describe('Testing getEarliestOffset', () => {
    it('Should return a number', done =>
      adminApi.getEarliestOffset(args.kafkaHost, args.topic, args.partition).then(num => {
        expect(typeof num).toEqual('number');
        done();
      }));
  });
  describe('Testing getLatestOffset', () => {
    it('Should return a number', done =>
      adminApi.getLatestOffset(args.kafkaHost, args.topic, 2).then(num => {
        expect(typeof num).toEqual('number');
        done();
      }));
  });
  describe('Testing getCurrentMsgCount', () => {
    it('Should return a number', done =>
      adminApi
        .getCurrentMsgCount(args.kafkaHost, args.topic, 2)
        .then(num => {
          console.log('Returned', num);
          expect(typeof num).toEqual('number');
          done();
        })
        .catch(err => expect(err).toEqual(null)));
  });
  describe('Testing getTopicMsgCount', () => {
    it('Should return a number', done =>
      adminApi.getTopicMsgCount(args.kafkaHost, args.topic, 2).then(num => {
        expect(typeof num).toEqual('number');
        done();
      }));
  });
});
