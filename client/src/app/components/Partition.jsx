import React from 'react';
import '../css/Partition.scss';

const Partition = (props) => (
  <div
    className="single-partition"
    id={props.id}
    onClick={props.showMessages}
    topicname={props.topicName}
  >
    {`Partition  ${props.id}`}
  </div>
);

export default Partition;
