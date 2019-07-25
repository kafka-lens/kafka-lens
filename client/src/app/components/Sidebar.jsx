import React from 'react';
import '../css/Sidebar.scss';
import LineChart from './LineChart.jsx';

const SideBar = ({ widthSideBar, brokerId, closeSideBar, brokerGraphData }) => {
  return (
    <div className="sidebar" style={{ width: widthSideBar }}>
      <div className="closebtn" key={brokerId} onClick={closeSideBar} style={{ color: '#51b3b5' }}>
        Close
      </div>
      <div>Displaying: broker {brokerId}</div>
      {brokerGraphData && <LineChart {...brokerGraphData} />}
    </div>
  );
};

export default SideBar;
