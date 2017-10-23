import React, { Component } from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'

/**
 * @description Resets the passwrod of a user
 *
 * @class ResetPassword
 * 
 * @extends {Component}
 */
export default class ResetPassword extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'> 
        <div className="col-md-3"></div>

          <div className='col-sm-12 col-md-6'>
            <h2>Reset your PostIt Password</h2><br />
            <h4>Enter your email address</h4><br />
            <form onSubmit={this
              .handleSubmit
              .bind(this)}>
              <div className='form-group'>
                <input
                  type="email"
                  ref='email'
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

    )
  }

  /**
   * @description Makes an action to Reset Password
   *
   * @param {any} event
   * 
   * @memberof ResetPassword
   */
  handleSubmit(event) {
    event.preventDefault();
    const email = this
      .refs
      .email
      .value
      .trim()
    AppActions.resetPassword(email);
    this.refs.email.value = '';
  }
}