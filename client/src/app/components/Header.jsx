import React from 'react';
import NavBar from './Navbar';
import '../css/navBar.scss';

function Header({ restartConnectionPage }) {
  return (
    <header id="header">
      <div>
        <NavBar restartConnectionPage={restartConnectionPage} routes={[{ link: '/', text: 'Topics' }, { link: '/broker', text: 'Brokers' }]} />
      </div>
    </header>
  );
}

export default Header;
