import React from 'react';
import PartitionList from './PartitionList';
import '../css/Topic.scss';

const Topic = ({ id, topicInfo, showPartitions, showMessages }) => (
  <div className="topic-header">
    <div
      className="topic-padding"
      id={id}
      topicname={topicInfo.topicName}
      role="button"
      tabIndex="0"
      onKeyPress={showPartitions}
      onClick={showPartitions}
    >
      {topicInfo.topicName}
    </div>
    {topicInfo.showPartitions === true ? (
      <PartitionList showMessages={showMessages} topicInfo={topicInfo} />
    ) : (
      ''
    )}
  </div>
);

export default Topic;
