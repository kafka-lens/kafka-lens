import React from 'react';
import '../css/PartitionInfo.scss';

const PartitionInfo = props => {
  return (

    <div className="partition-details">
        <h5>Partition: {props.partitionId}</h5>
        <p className="info-font-size">Message Count: {props.infoBoxData.messageCount}</p>
        <p className="info-font-size">Highwater Offset: {props.infoBoxData.highwaterOffset}</p>
        <p className="info-font-size">Earliest Offset: {props.infoBoxData.earliestOffset}</p>
    </div>
  );
};

export default PartitionInfo;
