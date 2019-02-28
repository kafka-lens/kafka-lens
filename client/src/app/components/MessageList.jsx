import React from 'react';
import Message from './Message.jsx';
import '../css/MessageList.scss';

const MessageList = props => {
  const messageArray = props.messageArray;
  const renderMessages = [];

  messageArray.forEach((msg, i) => {
    renderMessages.push(
      <Message key={i} id={i} message={messageArray[i].value} offset={messageArray[i].offset} />
    );
  });

  return <div className="message-list">{renderMessages}</div>;
};

export default MessageList;
