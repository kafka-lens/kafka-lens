import React from 'react';
import Message from './Message.jsx';
import '../css/MessageList.scss';

const MessageList = props => {
  const messageArray = props.messageArray;
  const renderMessages = [];

  // if (props.partitionNumber) {
  //   messageArray = messageArray.filter(
  //     msg => msg.topic === props.topicName && msg.partition === props.partitionNumber
  //   );
  // }

  messageArray.forEach((msg, i) => {
    // console.log('INSIDE MSG LIST COMPONENT pushing msg to array: ', msg);
    renderMessages.push(
      <Message key={i} id={i} message={messageArray[i].value} offset={messageArray[i].offset} />
    );
  });

  return <div className="message-list">{renderMessages}</div>;
};

export default MessageList;
