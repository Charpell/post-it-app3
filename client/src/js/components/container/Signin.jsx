import React, { Component } from 'react';
import toastr from 'toastr';
import GoogleButton from 'react-google-button';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/AppAPI';
import { firebase, provider }  from '../../../../../server/config';
import { validateEmail } from '../../helpers/utils';
import GoogleWelcome from './GoogleWelcome';
import Input from '../presentation/Input';


/**
 * @description Gets user data and persits with firebase 
 * 
 * @param {object} props
 * 
 * @class Signin
 * 
 * @extends {Component}
 */
class Signin extends Component {
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
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this)
    this.onChange = this.onChange.bind(this)
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
   * @description Adds an event Listener to the Store and fires when the component is fully mounted.
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
  * @memberof Signin
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @description Makes an action call to Sign in a user with email and password
   * 
   * @param {object} event
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
    }

    if (validateEmail(this.state.email)) {
      AppActions.loginUser(userDetails);
      this.setState({
        email: '',
        passowrd: ''
      })
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
      let result;
      result = username.split(' ');
      return (result[0])
    }
       
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const { photoURL, uid, email } = result.user;
        const displayName = firstName(result.user.displayName);
        localStorage.setItem('photoURL', JSON.stringify(photoURL))
        const googleUser = {
          displayName,
          email,
          uid,
          photoURL
        }
        if (this.state.emails.includes(googleUser.email)) {
          AppActions.receiveLogin(googleUser);
          toastr.success('Welcome to PostIt')
        } else {
          AppActions.googleLogin(googleUser);
          this.setState({
            googleComponent: true
          })
        }
      }).catch(() => toastr.error('There was an error in Network connection'));
  }

  /**
   * @method onChange
   * 
   * @description Monitors changes in the components and change the state
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
   */
  render() {
    let display;
    if (!this.state.googleComponent) {
      display =
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
            <div><a href="#/reset">Forgot Password?</a></div>
            <div><a href="#/register">Don't have an account? Signup</a></div> 
            <button type='submit' onClick={this.addAlert}
              className='btn btn-primary'>Log in</button>
          </form>

          <GoogleButton className="google-button" onClick={this.handleGoogleSignin} />
        </div>

    } else {
      display = < GoogleWelcome />

    }
    return (
      <div className="row">
        <div className="col-sm-12">
          {display}
        </div>
      </div>

    )
  }

}

export default Signin;