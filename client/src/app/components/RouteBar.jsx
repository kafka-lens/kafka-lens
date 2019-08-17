import PropTypes from 'prop-types';
import React from 'react';
import '../css/RouteBar.scss';

const RouteBar = ({ topicName, showingPartitionMetadata, partitionId }) => (
  <span className="route-padding">
    <h5 className="display-inline">Home &nbsp; &nbsp;</h5>
    {topicName && (
      <h5 className="display-inline">
        &gt; &nbsp; &nbsp;
        {topicName}
      </h5>
    )}
    {showingPartitionMetadata && (
      <h5 className="display-inline">
        &nbsp; &nbsp; &gt; &nbsp; &nbsp; Partition
        {partitionId}
      </h5>
    )}
  </span>
);

export default RouteBar;

RouteBar.propTypes = {
  partitionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showingPartitionMetadata: PropTypes.bool.isRequired,
  topicName: PropTypes.string,
};

RouteBar.defaultProps = {
  partitionId: null,
  topicName: null,
};
