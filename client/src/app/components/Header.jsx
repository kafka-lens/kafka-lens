import React from 'react';
import NavBar from './Navbar.jsx';
import '../css/navBar.scss';

function Header (props) {
  return (
    <header id="header">
      <div>
      <NavBar routes={ [ { link: '/', text: "topics" }, { link: '/broker', text: "broker" }, { link: '/connectionpage', text: "Connection Page" } ] }/>
      </div>
    </header>
  )
}

export default Header; 