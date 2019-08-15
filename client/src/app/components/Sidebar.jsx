import React from 'react';
import '../css/Sidebar.scss';
import LineChart from './LineChart';
import BrokerTopicsSideView from './BrokerTopicsSideView';

const SideBar = ({
  isSideBarOpen, brokerId, brokerTopics, closeSideBar, brokerGraphData,
}) => {
  const sideBarRight = isSideBarOpen ? '0' : '-30vw';

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
