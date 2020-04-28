import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Backend</div>
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <NavLink exact className="navbar__list-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="navbar__list-item">
          <NavLink exact className="navbar__list-link" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
