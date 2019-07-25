import React from 'react';
import '../css/Sidebar.scss';
import LineChart from './LineChart.jsx';

const SideBar = ({ isSideBarOpen, brokerId, closeSideBar, brokerGraphData }) => {
  const sideBarRigth = isSideBarOpen ? '0' : '-30vw';

  return (
    <div className="sidebar" style={{ right: sideBarRigth }}>
      <div className="closebtn" key={brokerId} onClick={closeSideBar} style={{ color: '#51b3b5' }}>
        Close
      </div>
      <div>Displaying: broker {brokerId}</div>
      {brokerGraphData && <LineChart {...brokerGraphData} />}
    </div>
  );
};

export default SideBar;
