import React from 'react';
import BrokerTopic from './BrokerTopic.jsx';

const BrokerTopicsView = props => {
  const brokerTopics = [];
  for (let i = 0; i < props.topics.length; i += 1) {
    brokerTopics.push(
      <BrokerTopic
        key={i}
        topicName={props.topics[i].topicName}
        newMessagesPerSecond={props.topics[i].newMessagesPerSecond}
        isLeader = {props.topics[i].isLeader}
      />
    );
  }

  return <div>{brokerTopics}</div>;
};

export default BrokerTopicsView;
