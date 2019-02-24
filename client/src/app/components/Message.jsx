import React from 'react';
import '../css/Message.scss';

const Message = props => {
  return (
    <span>
      <h6 className="offset-indicator">{props.offset}</h6>
      <p className="single-message">{props.message}</p>
    </span>
  );
};

export default Message;
