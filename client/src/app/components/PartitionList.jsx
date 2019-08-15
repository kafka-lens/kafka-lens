import React from 'react';
import Partition from './Partition.jsx';

const PartitionList = (props) => {
  const partitionsArray = [];
  const { numberOfPartitions } = props.topicInfo;

  for (let i = 0; i < numberOfPartitions; i++) {
    partitionsArray.push(
      <Partition
        key={i}
        id={i}
        showMessages={props.showMessages}
        topicName={props.topicInfo.topicName}
      />,
    );
  }

  return <div className="partition-list">{partitionsArray}</div>;
};

export default PartitionList;
