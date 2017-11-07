import React, { Component } from 'react';
import toastr from 'toastr';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

/**
 * @description component that registers a user with Google acccount
 *
 * @param {object} props
 *
 * @class GoogleWelcome
 *
 * @extends {Component}
 */
export default class GoogleWelcome extends Component {
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
      databaseUsers: [],
      numbers: [],
      number: '',
      googleDetail: AppStore.getGoogleSignup()
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    /**
     * @method componentDidMount
     *
     * @description Adds an event Listener to the Store and fires when the
     * component is fully mounted.
     *
     * @return {void}
     *
     * @memberof GoogleWelcome
     */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

    /**
    * @method componentWillUnmount

    * @description Removes event Listener from the Store
    * @return {void}
    *
    * @memberof GoogleWelcome
    */
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

    /**
    * description: controls inputs state
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
    * @description Makes an action call to Sign up a user with username,
    *email, phone number  and password
    *
    * @param {object} event
    *
    * @returns {void}
    *
    * @memberof GoogleWelcome
    */
  handleSubmit(event) {
    event.preventDefault();
    const contact = { ...this.state.googleDetail, number: this.state.number };

    if (this.state.numbers.includes(this.state.number)) {
      toastr.error('The phone number already exist');
    } else {
      AppActions.googleSignup(contact);
    }
  }

    /**
     * @method onChange
     *
     *@returns {void}
     *
     * @description Monitors changes in the components and change the state
     *
     * @memberof GoogleWelcome
     */
  onChange() {
    this.setState({
      databaseUsers: AppStore.getDatabaseUsers(),
      numbers: AppStore.getAllUsersNumber(),
      googleDetail: AppStore.getGoogleSignup()
    });
  }

    /**
     * @method render
     *
     * @description Render react component
     *
     * @returns {String} The HTML markup for the Register
     *
     * @memberof GoogleWelcome
     */
  render() {
    const displayName = this.state.googleDetail.displayName;
    return (
        <div>
            <h3> Welcome {displayName} </h3>
            <p>One more step, we need your phone number</p>
            <div className='well'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <input type="number" name='number'
                            className='form-control'
                            onChange={this.handleChange}
                            placeholder='Phone Number: Ex 2348066098146'
                            pattern="[234][0-9]{12}"
                            title="Should be 13 numbers and start with 234"
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
        </div>
    );
  }
}
