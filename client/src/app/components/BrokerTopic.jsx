import React from 'react';
import LoadingData from './LoadingData.jsx';


const BrokerTopic = props => {
  return (
    <div>
        <p><b>Topic Name:</b> {props.topicName}</p>
        {props.isLeader && typeof(props.newMessagesPerSecond) !== 'number' ? (
        <p><b>Msg Per Second:</b> {props.newMessagesPerSecond || 'Follower'}</p>
        ) : (
        <LoadingData />
        )}
      </div>
  );
};

export default BrokerTopic;
