import React from 'react';
import '../css/Message.scss';

const Message = props => {
  return (
    <span>
      <div className="single-message">
        {props.message}
        <p className="offset-indicator">{props.offset}</p>
      </div>
    </span>
  );
};

export default Message;
