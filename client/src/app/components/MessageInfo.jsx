import PropTypes from 'prop-types';
import React from 'react';
import logger from '../../utils/logger';
import '../css/MessageInfo.scss';

const MessageInfo = ({ lastMessage }) => {
  logger.log('lastMessage:', lastMessage);
  return (
    <div className="message-details">
      <h5>Last Message</h5>
      <p className="info-font-size">
        Topic:
        {lastMessage.topicName}
      </p>
      <p className="info-font-size">
        Message:
        {lastMessage.value}
      </p>
      <p className="info-font-size">
        Timestamp:
        {lastMessage.timestamp}
      </p>
    </div>
  );
};

export default MessageInfo;

MessageInfo.propTypes = {
  lastMessage: PropTypes.shape({
    topicName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};
