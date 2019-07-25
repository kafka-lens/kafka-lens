import React from 'react'
import '../css/Sidebar.scss'
import LineChart from './LineChart.jsx';


const SideBar = props => {
  return (
    <div className="sidebar" style={{width: props.widthSideBar}}>
      <div className="closebtn" key={props.brokerId} onClick={props.closeSideBar} style={{color: '#51b3b5'}}>Close</div>
      <LineChart />
    </div>
  )
}

export default SideBar;