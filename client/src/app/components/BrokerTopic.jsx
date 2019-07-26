import React from 'react';
import LoadingData from './LoadingData.jsx';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => {
  return (
    <div>
      <p>
        <b>Topic Name: </b> {topicName}
      </p>
      {isLeader && typeof (newMessagesPerSecond) !== 'number' ? (
        <LoadingData />
      ) : (
      <p>
        <b>Msg Per Second: </b> {!isLeader ? 'Follower' : newMessagesPerSecond}
      </p>
      )}
    </div>
  );
};

export default BrokerTopic;
