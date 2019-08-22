import PropTypes from 'prop-types';
import React from 'react';
import Partition from './Partition';

const PartitionList = ({ topicInfo, showMessages }) => {
  const partitionsArray = [];
  const { numberOfPartitions } = topicInfo;

  for (let i = 0; i < numberOfPartitions; i++) {
    partitionsArray.push(
      <Partition
        key={`${topicInfo.topicName}-${i}`}
        id={i.toString()}
        showMessages={showMessages}
        topicName={topicInfo.topicName}
      />,
    );
  }

  return <div className="partition-list">{partitionsArray}</div>;
};

export default PartitionList;

PartitionList.propTypes = {
  showMessages: PropTypes.func.isRequired,
  topicInfo: PropTypes.shape({
    numberOfPartitions: PropTypes.number,
    topicName: PropTypes.string.isRequired,
  }).isRequired,
};
