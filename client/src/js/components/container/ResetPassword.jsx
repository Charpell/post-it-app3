import React, { Component } from 'react';

import AppActions from '../../actions/AppActions';

/**
 * @description Resets the password of a user
 *
 * @class ResetPassword
 *
 * @extends {Component}
 */
export default class ResetPassword extends Component {
   /**
   * @description Creates an instance of ResetPassword.
   * bind methods and set initial state.
	 *
   * @memberof ResetPassword
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    /**
    * @description: controls inputs state
    *
    * @param {object} element the current element
    *
    * @return {void} void
    */
  handleChange(element) {
    this.setState({
      [element.target.name]: element.target.value
    });
  }

  /**
   * @description Makes an Api Action to Reset Password
   *
   * @param {any} event
   *
   * @return {void} void
   *
   * @memberof ResetPassword
   */
  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    AppActions.resetPassword(email);
  }

  /**
	 * @description Render react component
	 *
	 * @memberof ResetOassword
	 *
	 * @return { jsx } rendered jsx element
	 */
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className="col-md-3"></div>

          <div className='col-sm-12 col-md-6'>
            <h2>Reset your PostIt Password</h2><br />
            <h4>Enter your email address</h4><br />

            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input
                  type="email"
                  name='email'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Email'
                  required />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            <br />
            <div>
              <a href="#/login">Back to Log in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
