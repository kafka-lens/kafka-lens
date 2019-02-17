import React from 'react';
import '../css/Partition.scss';

const Partition = props => {
  return (
    <div 
      className="single-partition"
      id={props.id}
      onClick={props.showMessages}
      topicname={props.topicName}
    >
      Partition &nbsp; {props.id}
    </div>
  );
};

export default Partition;
