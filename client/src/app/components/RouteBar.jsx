import React from 'react';
import logger from '../../utils/logger'
import '../css/RouteBar.scss';

const RouteBar = props => {
  logger.log('RouteBar props', props);
  return (
    <span className="route-padding">
      <h5 className="display-inline">Home &nbsp; &nbsp;</h5>
      {props.topicName && <h5 className="display-inline">> &nbsp; &nbsp; {props.topicName}</h5>}
      {props.showPartitionInfo && <h5 className="display-inline">&nbsp; &nbsp; > &nbsp; &nbsp; Partition {props.partitionId}</h5>}
    </span>
  );
};

export default RouteBar;
