import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ routes, restartConnectionPage }) {
  const NavLinks = routes.map((e, index) => (
    <li key={index}>
      <NavLink style={{ color: '#f7f7f7', fontSize: 18 }} to={e.link}>
        {e.text}
      </NavLink>
    </li>
  ));

  NavLinks.push(
    <li key={`connection page`} >
      <NavLink onClick ={restartConnectionPage} style={{ color: '#f7f7f7', fontSize: 18 }} to="/connectionpage">
        Connection Page 
      </NavLink>
    </li>
  );
  return <ul style={{ margin: 0 }}>{NavLinks}</ul>;
}
export default Navbar;
