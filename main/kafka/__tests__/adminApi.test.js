import adminApi from '../adminApi';
import logger from '../../utils/logger'

xdescribe('adminApi unit tests', () => {
  describe('Testing getCurrentMsgCount', () => {
    it('Should return a number', () =>
      adminApi
        .getPartitionMsgCount(args.kafkaHostURI, args.topicName, 2)
        .then(num => {
          logger.log('Returned', num);
          expect(typeof num).toEqual('number');
        })
        .catch(err => expect(err).toEqual(null)));
  });
  describe('Testing getTopicMsgCount', () => {
    it('Should return a number', () =>
      adminApi.getTopicMsgCount(args.kafkaHostURI, args.topicName, 2).then(num => {
        expect(typeof num).toEqual('number');
      }));
  });
});
