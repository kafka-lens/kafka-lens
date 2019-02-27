import React from 'react';
import '../css/MessageInfo.scss';

const MessageInfo = props => {

  return (

    <div className="message-details">
        <h5>Last Message</h5>
        <p className="info-font-size">Topic: {props.lastMessage.topic}</p>
        <p className="info-font-size">Message: {JSON.parse(props.lastMessage.value).message}</p>
        <p className="info-font-size">Size: {props.lastMessage.size}</p>
        <p className="info-font-size">Timestamp: {props.lastMessage.timestamp}</p>
    </div>
  );
};

export default MessageInfo;