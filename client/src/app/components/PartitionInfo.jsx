import React from 'react';
import '../css/PartitionInfo.scss';

const PartitionInfo = props => {
  return (

    <div>
        <h4>Partition: {props.lastMessage.partition}</h4>
        <h4>High Water Offset: {props.lastMessage.highWaterOffset}</h4>
    </div>
  );
};

export default PartitionInfo;
