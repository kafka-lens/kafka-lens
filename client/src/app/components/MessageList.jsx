import React from 'react';
import Message from '../components/Message.jsx';
import '../css/MessageList.scss';

const MessageList = props => {
  let messageArray = props.messageArray;
  console.log('logging messageArray: ', messageArray);

  let renderMessages = [];

  messageArray.forEach((msg, i) => {
    //code here
    renderMessages.push(<Message key={i} id={i} message={messageArray[i].value} offset={messageArray[i].offset} />);
  });

  return (
    <div className="message-list">
      {renderMessages}
    </div>
  );
};

export default MessageList;
