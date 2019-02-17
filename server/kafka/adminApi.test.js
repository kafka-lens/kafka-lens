import { buildTopicObj } from './adminApi';

describe('adminApi unit tests', () => {
  describe('buildTopicObj', () => {
    it('returns an object with the properties: topic, partition, messages', () => {
      const output = {
        topic: 'testTopic',
        partition: 10,
        messages: 10
      };
      expect(buildTopicObj('testTopic', 10, 10)).toEqual(output);
    });
  });
});
