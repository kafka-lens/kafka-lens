import React from 'react';
import LoadingData from './LoadingData.jsx';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => {
  return (
    <div className="broker-topic">
      <p>{topicName} :</p>
      {isLeader && typeof (newMessagesPerSecond) !== 'number' ? (
        <LoadingData />
      ) : (
       <p>{!isLeader ? 'Follower' : newMessagesPerSecond}</p>
      )}
    </div>
  );
};

export default BrokerTopic;
