import React from 'react';
import BrokerTopic from './BrokerTopic.jsx';

const BrokerTopicsView = props => {
  const arr = [];
  for (let i = 0; i < props.topics.length; i += 1) {
    arr.push(
      <BrokerTopic
        key={i}
        topicName={props.topics[i].topicName}
        newMessagesPerSecond={props.topics[i].newMessagesPerSecond}
      />
    );
  }

  return <div>{arr}</div>;
};

export default BrokerTopicsView;
