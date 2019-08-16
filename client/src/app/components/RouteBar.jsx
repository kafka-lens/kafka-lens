import PropTypes from 'prop-types';
import React from 'react';
import '../css/RouteBar.scss';

const RouteBar = ({ topicName, showPartitionInfo, partitionId }) => (
  <span className="route-padding">
    <h5 className="display-inline">Home &nbsp; &nbsp;</h5>
    {topicName && (
      <h5 className="display-inline">
        &gt; &nbsp; &nbsp;
        {topicName}
      </h5>
    )}
    {showPartitionInfo && (
      <h5 className="display-inline">
        &nbsp; &nbsp; &gt; &nbsp; &nbsp; Partition
        {partitionId}
      </h5>
    )}
  </span>
);

export default RouteBar;

RouteBar.propTypes = {
  partitionId: PropTypes.number.isRequired,
  showPartitionInfo: PropTypes.func.isRequired,
  topicName: PropTypes.string.isRequired,
};
