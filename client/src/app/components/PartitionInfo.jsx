import React from 'react';
import logger from '../../utils/logger';
import '../css/PartitionInfo.scss';

const PartitionInfo = ({ partitionInfo, partitionId }) => {
  const replicasString = partitionInfo.replicas.join(', ');
  return (
    <div className="partition-details">
      {logger.log(partitionInfo.msgCount)}
      <h5>
        Partition:
        {partitionId}
      </h5>
      <p className="info-font-size">
        Message Count:
        {partitionInfo.msgCount}
      </p>
      <p className="info-font-size">
        Highwater Offset:
        {partitionInfo.highwaterOffset}
      </p>
      <p className="info-font-size">
        Earliest Offset:
        {partitionInfo.earliestOffset}
      </p>
      <p className="info-font-size">
        Leader Broker:
        {partitionInfo.leader}
      </p>
      <p className="info-font-size">
        Replica Broker(s):
        {replicasString}
      </p>
    </div>
  );
};

export default PartitionInfo;
