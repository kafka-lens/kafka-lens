import React from 'react';
import PropTypes from 'prop-types';
import LoadingData from './LoadingData';

const BrokerTopic = ({ topicName, isLeader, newMessagesPerSecond }) => (
  <div className="broker-topic">
    <p>{topicName} :</p>
    {isLeader && typeof newMessagesPerSecond !== 'number' ? (
      <LoadingData />
    ) : (
      <p>{!isLeader ? 'Follower' : newMessagesPerSecond}</p>
    )}
  </div>
);

export default BrokerTopic;

BrokerTopic.propTypes = {
  topicName: PropTypes.string.isRequired,
  isLeader: PropTypes.bool.isRequired,
  newMessagesPerSecond: PropTypes.number,
};

BrokerTopic.defaultProps = {
  newMessagesPerSecond: null,
};
