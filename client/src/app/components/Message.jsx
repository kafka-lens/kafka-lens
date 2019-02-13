import React from 'react';

const Message = props => {

  console.log('logging props.message: ', props.message)
  return (
  <div>
    {props.id + ': '}{props.message}
  </div>
  );
};

export default Message;