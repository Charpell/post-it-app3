import React, {Component} from 'react';

import Signin from './Signin'
import Dashboard from "./Dashboard/Dashboard";
import AppStore from '../stores/AppStore'

/**
 * @description It renders the Home page Component
 *
 * @class Home
 * 
 * @extends {Component}
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: AppStore.getAuth()
    };
    this.onChange = this
      .onChange
      .bind(this)
  }

  /**
    * @method componentDidMount
    *
    * @description Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    *
    * @memberof Home
    */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

  /**
* @method componentUnmount
*
* @description Removes event Listener from the Store
*
* @memberof Home
*/
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

    /**
     * @method setApp
     * 
     * @description Monitors changes in the components and change the state
     *
     * @memberof Home
     */
    onChange() {
      this.setState({
        isAuthenticated: AppStore.getAuth()
      });
    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="jumbotron">
              <h1 className="display-3">Welcome to PostIt</h1>
              <p className="lead">PostIt is a simple application that allows 
                friends and colleagues create groups for notifications.</p>
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="form-margin2">
              <Signin />
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default Home;