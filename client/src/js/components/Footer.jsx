import React, { Component } from 'react'


/**
 * @description Footer Component
 * 
 * @class Welcome
 * 
 * @extends {Component}
 */
export default class Welcome extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-bottom"
        style={{ borderRadius: '0px' }}>
        <div className="container-fluid">
          <a className="navbar-brand low-red" href="#">Andela</a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </nav>
    )
  }
}