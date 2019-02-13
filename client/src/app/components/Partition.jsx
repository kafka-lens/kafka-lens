import React from 'react';
import '../css/Partition.css';

const Partition = props => {
  return (
    <div className="partition"> 
      Partition {props.id} 
      <button className="partition-button" id={props.id} onClick={props.showMessages} topicname={props.topicName}>+</button>
    </div>
  )
};

export default Partition;
