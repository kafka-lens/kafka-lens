import adminApi from '../adminApi';
import logger from '../../utils/logger';

xdescribe('adminApi unit tests', () => {
  const kafkaHostURI = 'localhost:9092';
  const topicName = 'first';

  describe('Testing getCurrentMsgCount', () => {
    it('Should return a number', () => {
      adminApi
        .getPartitionMsgCount(kafkaHostURI, topicName, 2)
        .then((num) => {
          logger.log('Returned', num);
          expect(typeof num).toEqual('number');
        })
        .catch((err) => expect(err).toEqual(null));
    });
  });

  describe('Testing getTopicMsgCount', () => {
    it('Should return a number', () => {
      adminApi.getTopicMsgCount(kafkaHostURI, topicName, 2)
        .then((num) => expect(typeof num).toEqual('number'));
    });
  });
});
