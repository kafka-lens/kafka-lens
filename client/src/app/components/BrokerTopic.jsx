import React from 'react';
import LoadingData from './LoadingData';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => (
  <div className="broker-topic">
    <p>
{topicName} :</p>
    {isLeader && typeof newMessagesPerSecond !== 'number' ? (
      <LoadingData />
    ) : (
      <p>{!isLeader ? 'Follower' : newMessagesPerSecond}</p>
    )}
  </div>
);

export default BrokerTopic;
