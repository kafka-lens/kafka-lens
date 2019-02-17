import React from 'react';
import '../css/Message.scss';

const Message = props => {
  console.log('logging props.message: ', props.message);
  return (
    <div className="single-message">
      {props.message}
    </div>
  );
};

export default Message;
