import React from 'react';
import NavBar from './Navbar.jsx';
import '../css/navBar.scss';

function Header(props) {
  return (
    <header id="header">
      <div>
        <NavBar restartConnectionPage={props.restartConnectionPage} routes={[{ link: '/', text: 'Topics' }, { link: '/broker', text: 'Brokers' }]} />
      </div>
    </header>
  );
}

export default Header;
