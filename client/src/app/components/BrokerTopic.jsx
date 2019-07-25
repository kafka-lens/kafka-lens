import React from 'react';
import LoadingData from './LoadingData.jsx';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => {
  return (
    <div>
      <p>
        <b>Topic Name: </b> {topicName}
      </p>
<<<<<<< HEAD
      {isLeader && typeof(newMessagesPerSecond) !== 'number' ? (
=======
      {isLeader && typeof (newMessagesPerSecond) !== 'number' ? (
        <p>
          <b>Msg Per Second:</b> {newMessagesPerSecond || 'Follower'}
        </p>
      ) : (
>>>>>>> e3dccb318914311e9c00fe9714e6bf2636c6ffa0
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
