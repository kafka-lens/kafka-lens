import React from 'react';
import LoadingData from './LoadingData.jsx';


const BrokerTopic = props => {
  let newMessagesPerSecondCount = typeof(props.newMessagesPerSecond) === 'number' ? props.newMessagesPerSecond : props.isLeader ? <LoadingData /> : 'Follower';
  return (
    <div>
        <p>Topic Name: {props.topicName}</p>
        <p>Msg Per Second: {newMessagesPerSecondCount}</p>
      </div>
  );
};

export default BrokerTopic;
