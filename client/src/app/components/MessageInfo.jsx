import React from 'react';
import '../css/MessageInfo.scss';

const MessageInfo = ({ lastMessage }) => {
  console.log('lastMessage:', lastMessage);
  return (
    <div className="message-details">
      <h5>Last Message</h5>
      <p className="info-font-size">Topic: {lastMessage.topicName}</p>
      <p className="info-font-size">Message: {lastMessage.value}</p>
      <p className="info-font-size">Timestamp: {lastMessage.timestamp}</p>
      <p className="info-font-size">Size: {lastMessage.size}</p>
    </div>
  );
};

export default MessageInfo;
