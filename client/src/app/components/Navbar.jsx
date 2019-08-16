import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ routes, restartConnectionPage }) {
  const connectionPageLink = (
    <li key="connectionPage">
      <NavLink
        onClick={restartConnectionPage}
        style={{ color: '#f7f7f7', fontSize: 18 }}
        to="/connectionpage"
      >
        Connection Page
      </NavLink>
    </li>
  );

  const navLinks = [connectionPageLink].concat(
    routes.map(route => (
      <>
        <li
          key={`separator-${route.link}`}
          style={{ color: 'rgba(255, 255, 255, 0.5)', padding: '0 8px' }}
        >
          {' '}
          |{' '}
        </li>
        <li key={route.link}>
          <NavLink style={{ color: '#f7f7f7', fontSize: 18 }} to={route.link}>
            {route.text}
          </NavLink>
        </li>
      </>
    )),
  );
  return <ul style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>{navLinks}</ul>;
}

export default Navbar;

Navbar.propTypes = {
  restartConnectionPage: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({ link: PropTypes.string.isRequired, text: PropTypes.string.isRequired }),
  ).isRequired,
};
