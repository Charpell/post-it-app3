import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description Navigation Component gives the user access to
 * navigate around the app
 *
 * @class Navigation
 *
 * @extends {Component}
 */
const Navigation = () => (
  <div>
    <nav className="navbar navbar-inverse fixed-top"
      style={{ borderRadius: '0px' }}>
      <div className="container-fluid">
        <div className="navbar-header" id="navbar-header">
          <a className="navbar-brand low-red" href="#"> &nbsp;&nbsp;POST IT</a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><Link to='/'>Home </Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;
