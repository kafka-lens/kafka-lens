import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ routes }) {
  console.log(`routes`, routes)
  const NavLinks = routes.map((e, index) => (
    <li key={index}>
      <NavLink to={e.link}>{e.text}</NavLink>
    </li>
  ));
  console.log(NavLinks)
  return <ul>{NavLinks}</ul>;
}
export default Navbar;
