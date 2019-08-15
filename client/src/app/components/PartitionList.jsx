import React from 'react';
import Partition from './Partition';

const PartitionList = ({ topicInfo, showMessages }) => {
  const partitionsArray = [];
  const { numberOfPartitions } = topicInfo;

  for (let i = 0; i < numberOfPartitions; i++) {
    partitionsArray.push(
      <Partition
        key={i}
        id={i}
        showMessages={showMessages}
        topicName={topicInfo.topicName}
      />,
    );
  }

  return <div className="partition-list">{partitionsArray}</div>;
};

export default PartitionList;
