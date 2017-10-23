import React, { Component } from 'react';
import toastr from 'toastr';

import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import { firebaseAuth, firebase, provider } from '../../../../server/config';
import { validateEmail } from '../helpers/validate.helper';



/**
 * @description Gets user data and persits with firebase
 * 
 * @param {object} props
 * 
 * @class Signup
 * 
 * @extends {Component}
 */
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: AppStore.getContacts(),
            databaseUsers: AppStore.getdatabaseUsers(),
            emails: AppStore.getGroupEmails(),
            numbers: AppStore.getAllUsersNumber(),
            googleUser: AppStore.getGoogleSignup()

        };
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    /**
     * @method componentDidMount
     * 
     * @description Adds an event Listener to the Store and fires when the component is fully mounted.
     * 
     * @return {void}
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
    * @memberof Signup
    */
    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }


    /**
     * @method onChange
     * 
     * @description Monitors changes in the components and change the state
     * 
     * @memberof Signup
     */
    onChange() {
        this.setState({
            databaseUsers: AppStore.getdatabaseUsers(),
            emails: AppStore.getGroupEmails(),
            numbers: AppStore.getAllUsersNumber(),
            googleUser: AppStore.getGoogleSignup()
        });

    }

    
    /**
    * @description Makes an action call to Sign up a user with username, email, phone number  and password
    *
    * @param {object} event
    *
    * @returns {void}
    *
    * @memberof Signup
    */
    handleSubmit(event) {
        event.preventDefault();

        /**
    * @method function
    * 
    * @param {any} string
    *
    * @memberof Signup
    */
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const userNameToUppercase = capitalizeFirstLetter(this.refs.username.value);

        const contact = {
            username: userNameToUppercase,
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim(),
            number: this.refs.number.value.trim()
        }

        if (this.state.databaseUsers.includes(userNameToUppercase)) {
            toastr.error('The username already exist')
        } else if (this.state.numbers.includes(this.refs.number.value)) {
            toastr.error('The phone number already exist')
        } else if (this.refs.password.value !== this.refs.verifyPassword.value) {
            toastr.error('Password does not match')

        } else if (!validateEmail(this.refs.email.value)) {
            toastr.error('Invalid Email Address')
        } else {
            AppActions.saveContact(contact);
            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.password.value = '';
            this.refs.number.value = '';
            this.refs.verifyPassword.value = '';
        }
    }

    /**
     * @method render
     * 
     * @description Render react component
     * 
     * @memberof Signup
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
                                <div className='form-group'>
                                    <input type="text" ref='username' 
                                    className='form-control' 
                                    placeholder='Username' required />
                                </div>
                                <div className='form-group'>
                                    <input type="text" ref='email' 
                                    className='form-control' placeholder='Email' 
                                    required />
                                </div>
                                <div className='form-group'>
                                    <input type="text" ref='number' 
                                    className='form-control' 
                                    placeholder='Phone Number: Ex 2348066098146' 
                                    pattern="[234][0-9]{12}" 
                                    title="It will contain only 13 numbers and must start with 234" 
                                    required />
                                </div>
                                <div className='form-group'>
                                    <input type="password" ref='password' 
                                    className='form-control' 
                                    placeholder='Password' 
                                    pattern="(?=.*\d).{6,}" 
                                    title="Must contain at least 6 characters and 1 number" 
                                    required />
                                </div>
                                <div className='form-group'>
                                    <input type="password" ref='verifyPassword' 
                                    className='form-control' 
                                    placeholder='Verify Password' 
                                    pattern="(?=.*\d).{6,}" required />
                                </div>
                                <button type='submit' 
                                className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>

        )
    }

}
