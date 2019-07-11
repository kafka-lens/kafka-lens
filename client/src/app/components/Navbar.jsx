import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar({ routes }) {
  const NavLinks = routes.map((e, index) => (
    <li key={index}>
      <NavLink to={e.link}>{e.text}</NavLink>
    </li>
  ));
  return <ul style={{ margin : 0}}>{NavLinks}</ul>;
}
export default Navbar;
