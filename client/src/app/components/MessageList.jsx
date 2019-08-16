import PropTypes from 'prop-types';
import React from 'react';
import Message from './Message';
import '../css/MessageList.scss';

const MessageList = ({ topicName, messageArray }) => {
  const messagesToRender = [];

  messageArray.forEach((msg, i) => {
    messagesToRender.push(
      <Message key={`${topicName}-${msg.offset}`} id={i} message={msg.value} offset={msg.offset} />,
    );
  });

  return <div className="message-list">{messagesToRender}</div>;
};

export default MessageList;

MessageList.propTypes = {
  messageArray: PropTypes.arrayOf(
    PropTypes.shape({ offset: PropTypes.string.isRequired, value: PropTypes.string.isRequired }),
  ).isRequired,
  topicName: PropTypes.string.isRequired,
};
