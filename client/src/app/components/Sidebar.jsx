import React from 'react';
import '../css/Sidebar.scss';
import LineChart from './LineChart.jsx';
import BrokerTopicsSideView from './BrokerTopicsSideView.jsx';

const SideBar = ({
  isSideBarOpen, brokerId, brokerTopics, closeSideBar, brokerGraphData,
}) => {
  const sideBarRigth = isSideBarOpen ? '0' : '-30vw';

  return (
    <div className="sidebar" style={{ right: sideBarRigth }}>
      <div className="closebtn" key={brokerId} onClick={closeSideBar} style={{ color: '#51b3b5' }}>
        Close
      </div>
      {brokerGraphData && <LineChart {...brokerGraphData} brokerId={brokerId} />}
      <BrokerTopicsSideView topics={brokerTopics} brokerID={brokerId} />
    </div>
  );
};

export default SideBar;
