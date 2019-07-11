import React from 'react';
import NavBar from './Navbar.jsx';


function Header (props) {
  return (
    <header>
      <div>
      <NavBar routes={ [ { link: '/', text: "topics" }, { link: '/broker', text: "broker" }  ] }/>
      </div>
    </header>
  )
}

export default Header; 