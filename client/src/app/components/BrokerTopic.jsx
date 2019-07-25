import React from 'react';
import LoadingData from './LoadingData.jsx';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => {
  return (
    <div>
      <p>
        <b>Topic Name:</b> {topicName}
      </p>
      {isLeader && typeof (newMessagesPerSecond) !== 'number' ? (
        <p>
          <b>Msg Per Second:</b> {newMessagesPerSecond || 'Follower'}
        </p>
      ) : (
        <LoadingData />
      )}
    </div>
  );
};

export default BrokerTopic;
