import React from 'react';
import Partition from '../components/Partition.jsx';

const PartitionList = props => {
  let partitionsArray = [];
  const numberOfPartitions = props.topicInfo.numberOfPartitions;

  for (let i = 0; i < numberOfPartitions; i++) {
    partitionsArray.push(
      <Partition
        key={i}
        id={i}
        showMessages={props.showMessages}
        topicName={props.topicInfo.topicName}
      />
    );
  }

  return <div className="partition-list">{partitionsArray}</div>;
};

export default PartitionList;
