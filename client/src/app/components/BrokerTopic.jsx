import React from 'react';
import LoadingData from './LoadingData.jsx';


const BrokerTopic = props => {
  let newMessagesPerSecondCount = typeof(props.newMessagesPerSecond) === 'number' ? props.newMessagesPerSecond : props.isLeader ? <LoadingData /> : 'Follower';
  return (
    <div>
        <p> <b> Topic Name: </b> {props.topicName}</p>
        <p> <b> Msg Per Second: </b> {newMessagesPerSecondCount}</p>
      </div>
  );
};

export default BrokerTopic;
