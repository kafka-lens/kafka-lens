import PropTypes from 'prop-types';
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
    {topicInfo.showPartitions ? (
      <PartitionList showMessages={showMessages} topicInfo={topicInfo} />
    ) : (
      ''
    )}
  </div>
);

export default Topic;

Topic.propTypes = {
  id: PropTypes.number.isRequired,
  showMessages: PropTypes.func.isRequired,
  showPartitions: PropTypes.func.isRequired,
  topicInfo: PropTypes.shape({
    topicName: PropTypes.string.isRequired,
    showPartitions: PropTypes.bool,
  }).isRequired,
};
