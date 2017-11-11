import React, { Component } from 'react';
import toastr from 'toastr';
import GoogleButton from 'react-google-button';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import config from '../../../../../server/config';
import { validateEmail } from '../../helpers/utils';
import GoogleWelcome from './GoogleWelcome';
import Input from '../presentation/Input';
const { firebase, provider } = config;


/**
 * @description the signin components lets users log into the app
 *
 * @class Signin
 *
 * @extends {Component}
 */
class Signin extends Component {
  /**
  * @description Creates an instance of Signin.
  * bind methods and set initial state.
  *
  * @memberof Signin
  *
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      googleComponent: false,
      googleUser: null,
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.onChange = this.onChange.bind(this);
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
   * @method componentDidMount
   *
   * @description Adds an event Listener to the Store and fires
	 * when the component is fully mounted.
   *
   * @return {void} void
   *
   * @memberof Signin
   */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

  /**
  * @method componentWillUnmount
  *
  * @description Removes event Listener from the Store
	*
	* @return {void} void
	*
  * @memberof Signin
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @description Makes an action call to Sign in a user with email and password
   *
   * @param {object} event the event object
   *
   * @returns {void}
   *
   * @memberof Signin
*/
  handleSubmit(event) {
    event.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password
    };

    if (validateEmail(this.state.email)) {
      AppActions.loginUser(userDetails);
      this.setState({
        email: '',
        passowrd: ''
      });
    }
  }

  /**
  * @description Makes an action call to Sign in a user with google account

  * @param {object} event
  *
  * @returns {void}
  *
  * @memberof Signin
*/
  handleGoogleSignin(event) {
    event.preventDefault();
    const firstName = (username) => {
      const result = username.split(' ');
      return (result[0]);
    };

    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const { photoURL, uid, email } = result.user;
        const displayName = firstName(result.user.displayName);
        const googleUser = {
          displayName,
          email,
          uid,
          photoURL
        };
        if (this.state.emails.includes(googleUser.email)) {
          AppActions.receiveLogin(googleUser);
          toastr.success('Welcome to PostIt');
        } else {
          AppActions.googleLogin(googleUser);
          this.setState({
            googleComponent: true
          });
        }
      }).catch(() => toastr.error('There was an error in network connection'));
  }

  /**
   * @description this method gets data from the store and sets to state
   *
   * @description Monitors changes in the components and change the state
	 *
	 * @returns { void } void
   *
   * @memberof Signin
   */
  onChange() {
    this.setState({
      emails: AppStore.getAllEmails(),
      googleUser: AppStore.getGoogleSignup()
    });
  }

  /**
   * @method render
   *
   * @description Render react component
   *
   * @memberof Signin
	 *
	 *@return { jsx } rendered jsx element
   */
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {!this.state.googleComponent ?
            <div className='well col-md-8 col-md-offset-2'>
              <h3>Sign In</h3>
              <form onSubmit={this.handleSubmit}>
                <Input
                  name="email"
                  type={'text'}
                  action={this.handleChange}
                  className={'form-control'}
                  placeholder={'Email'}
                />
                <Input
                  name="password"
                  type={'password'}
                  action={this.handleChange}
                  className={'form-control'}
                  placeholder={'Password'}
                />
                <div><a href="/reset">Forgot Password?</a></div>
                <div><a href="/register">Don't have an account? Signup</a></div>
                <button type='submit' onClick={this.addAlert}
                  className='btn btn-primary'>Log in</button>
              </form>

              <GoogleButton
                className="google-button"
                onClick={this.handleGoogleSignin}
              />
            </div> :
            < GoogleWelcome />}
        </div>
      </div>
    );
  }
}

export default Signin;
