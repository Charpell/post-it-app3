import React, { Component } from 'react';
import toastr from 'toastr';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import { validateEmail } from './../../helpers/utils';
import Input from '../presentation/Input';


/**
 * @description the signup components lets users register an account
 *
 * @class SignUp
 *
 * @extends {Component}
 */
export default class Signup extends Component {
  /**
  * @description Creates an instance of Signup.
  * bind methods and set initial state.
  *
  * @memberof Signup
  *
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      databaseUsers: [],
      emails: [],
      numbers: [],
      googleUser: null,
      username: '',
      email: '',
      number: '',
      password: '',
      verifyPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @method componentDidMount
   *
   * @description A react life cycle method that listens to change
   * from the store,then fires an action.
   *
   * @return {void} void
   *
   * @memberof Signup
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
  * @memberof Signup
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @description: controls inputs state
  *
  * @param {Object} element the current element
  *
  * @return {void} void
  */
  handleChange(element) {
    this.setState({
      [element.target.name]: element.target.value
    });
  }

  /**
   * @method onChange
   *
   * @description this method gets data from the store and sets to state
   *
   * @returns {void} void
   *
   * @memberof Signup
   */
  onChange() {
    this.setState({
      databaseUsers: AppStore.getDatabaseUsers(),
      numbers: AppStore.getAllUsersNumber(),
      googleUser: AppStore.getGoogleSignup()
    });
  }


  /**
  * @description describes a method that makes an action call
  * to Sign up a user with username, email, phone number  and password
  *
  * @param {object} event the event object
  *
  * @returns {void}
  *
  * @memberof Signup
  */
  handleSubmit(event) {
    event.preventDefault();

    const userDetails = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      number: this.state.number
    };

    if (this.state.databaseUsers.includes(this.state.userName)) {
      toastr.error('The username already exist');
    } else if (this.state.numbers.includes(this.state.number)) {
      toastr.error('The phone number already exist');
    } else if (this.state.password !== this.state.verifyPassword) {
      toastr.error('Password does not match');
    } else if (!validateEmail(this.state.email)) {
      toastr.error('Invalid Email Address');
    } else {
      AppActions.registerUser(userDetails);
    }
  }

  /**
   * @description Render react component
   *
   * @memberof Signup
   *
   * @return { jsx } rendered jsx element
   */
  render() {
    return (
      <div>
        <div className="container" >
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <h3>Sign Up</h3>
              <form onSubmit={this.handleSubmit}>
                <Input
                  name="userName"
                  type={'text'}
                  action={this.handleChange}
                  className={'form-control'}
                  placeholder={'Username'}
                />
                <Input
                  name="email"
                  type={'text'}
                  action={this.handleChange}
                  className={'form-control'}
                  placeholder={'Email'}
                />
                <div className='form-group'>
                  <input type="text" name='number'
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Phone Number: Ex 2348066098146'
                    pattern="[234][0-9]{12}"
                    title="It will contain 13 numbers and must start with 234"
                    required
                  />
                </div>
                <div className='form-group'>
                  <input type="password" name='password'
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Password'
                    pattern="(?=.*\d).{6,}"
                    title="Must contain at least 6 characters and 1 number"
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type="password"
                    name='verifyPassword'
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Verify Password'
                    pattern="(?=.*\d).{6,}"
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'>
                  Submit
                </button>
              </form>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
