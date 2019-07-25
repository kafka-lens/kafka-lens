import React from 'react';
import BrokerTopic from './BrokerTopic.jsx';

const BrokerTopicsView = ({ topics }) => {
  const brokerTopics = [];
  for (let i = 0; i < topics.length; i += 1) {
    brokerTopics.push(
      <BrokerTopic
        key={i}
        topicName={topics[i].topicName}
        newMessagesPerSecond={topics[i].newMessagesPerSecond}
        isLeader={topics[i].isLeader}
      />
    );
  }

  return <div>{brokerTopics}</div>;
};

export default BrokerTopicsView;
