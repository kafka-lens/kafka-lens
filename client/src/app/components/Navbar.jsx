import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ routes, restartConnectionPage }) {
  const connectionPageLink = (
    <li key="connection page">
      <NavLink onClick={restartConnectionPage} style={{ color: '#f7f7f7', fontSize: 18 }} to="/connectionpage">
        Connection Page
      </NavLink>
    </li>
  );

  const navLinks = [connectionPageLink].concat(routes.map((e, index) => (
    <>
      <li style={{ color: 'rgba(255, 255, 255, 0.5)', padding: '0 8px' }}> | </li>
      <li key={index}>
        <NavLink style={{ color: '#f7f7f7', fontSize: 18 }} to={e.link}>
          {e.text}
        </NavLink>
      </li>
    </>
  )));
  return <ul style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>{navLinks}</ul>;
}
export default Navbar;
