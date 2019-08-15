import React from 'react';
import Message from './Message.jsx';
import '../css/MessageList.scss';

const MessageList = ({ messageArray }) => {
  const renderMessages = [];

  messageArray.forEach((msg, i) => {
    renderMessages.push(
      <Message key={i} id={i} message={msg.value} offset={msg.offset} />,
    );
  });

  return <div className="message-list">{renderMessages}</div>;
};

export default MessageList;
