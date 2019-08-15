import React from 'react';
import '../css/Partition.scss';

const Partition = ({ id, showMessages, topicName }) => (
  <div
    id={id}
    className="single-partition"
    role="button"
    tabIndex="0"
    onKeyPress={showMessages}
    onClick={showMessages}
    topicname={topicName}
  >
    {`Partition  ${id}`}
  </div>
);

export default Partition;
