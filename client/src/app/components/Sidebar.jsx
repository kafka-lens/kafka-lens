import PropTypes from 'prop-types';
import React from 'react';
import nullableProp from '../../utils/nullableProp';
import LineChart from './LineChart';
import BrokerTopicsSideView from './BrokerTopicsSideView';
import '../css/Sidebar.scss';
import logger from '../../utils/logger';

const SideBar = ({ isSideBarOpen, brokerId, brokerTopics, closeSideBar, brokerGraphData }) => {
  const sideBarRight = isSideBarOpen ? '0' : '-30vw';

  logger.log('brokerGraphData:', brokerGraphData);

  return (
    <div className="sidebar" style={{ right: sideBarRight }}>
      <div
        className="closebtn"
        key={brokerId}
        role="button"
        tabIndex="0"
        onKeyPress={closeSideBar}
        onClick={closeSideBar}
        style={{ color: '#51b3b5' }}
      >
        Close
      </div>
      {brokerGraphData && (
        <LineChart
          timeStamps={brokerGraphData.timeStamps}
          topicsData={brokerGraphData.topicsData}
          brokerId={brokerId}
        />
      )}
      <BrokerTopicsSideView topics={brokerTopics} brokerID={brokerId} />
    </div>
  );
};

export default SideBar;

SideBar.propTypes = {
  brokerGraphData: nullableProp(
    PropTypes.shape({
      timeStamps: PropTypes.arrayOf(PropTypes.number),
      topicsData: PropTypes.object,
    }),
  ).isRequired,
  brokerId: nullableProp(PropTypes.number).isRequired,
  brokerTopics: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeSideBar: PropTypes.func.isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
};
