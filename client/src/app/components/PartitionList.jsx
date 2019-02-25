import React from 'react';
import Partition from '../components/Partition.jsx';

const PartitionList = props => {
  const numberOfPartitions = props.topicInfo.partition;
  partitionsArray = numberOfPartitions.map(() => {
    return (
      <Partition
        key={i}
        id={i}
        showMessages={props.showMessages}
        topicName={props.topicInfo.topic}
      />
    );
  });

  return (
    <div className="partition-list">
      <h5 className="p-header">Partitions</h5>
      {partitionsArray}
    </div>
  );
};

export default PartitionList;
