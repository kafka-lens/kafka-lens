import React from 'react';
import '../css/PartitionInfo.scss';

const PartitionInfo = props => {
  return (
    <div className="partition-details">
      {console.log(props.infoBoxData.msgCount)}
      <h5>Partition: {props.partitionId}</h5>
      <p className="info-font-size">Message Count: {props.infoBoxData.msgCount}</p>
      <p className="info-font-size">Highwater Offset: {props.infoBoxData.highwaterOffset}</p>
      <p className="info-font-size">Earliest Offset: {props.infoBoxData.earliestOffset}</p>
      <p className="info-font-size">Leader Broker: {props.infoBoxData.leader}</p>
      <p className="info-font-size">Replica Broker(s): {props.infoBoxData.replicas}</p>
    </div>
  );
};

export default PartitionInfo;
