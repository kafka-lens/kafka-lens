import React from 'react';
import '../css/PartitionInfo.scss';

const PartitionInfo = props => {
  return (

    <div className="partition-info">
        <h5>Partition: {props.lastMessage.partition}</h5>
        <p className="info-font-size">Current Message: {props.lastMessage.offset}</p>
        <p className="info-font-size">High Water Offset: {props.lastMessage.highWaterOffset}</p>
        <p className="info-font-size">Total Messages: . . .</p>
    </div>
  );
};

export default PartitionInfo;
