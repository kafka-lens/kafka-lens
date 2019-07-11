import React from 'react';
import NavBar from './Navbar.jsx';
import '../css/Header.scss';

function Header (props) {
  return (
    <header id="header">
      <div>
      <NavBar routes={ [ { link: '/', text: "topics" }, { link: '/broker', text: "broker" }  ] }/>
      </div>
    </header>
  )
}

export default Header; 