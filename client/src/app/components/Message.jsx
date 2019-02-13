import React from 'react';
import '../css/Message.css';

const Message = props => {
  console.log('logging props.message: ', props.message);
  return (
    <div>
      {props.id + ': '}
      {props.message}
    </div>
  );
};

export default Message;
