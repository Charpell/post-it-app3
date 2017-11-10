import React, { Component } from 'react';
import Footer from '../presentation/Footer';
import Routes from '../presentation/Routes';
import AppStore from '../../stores/AppStore';
import Navigation from '../presentation/Navigation';
import Dashboard from './Dashboard';


/**
 * @description This component is the app's parent component
 * Checks for user signed in and signed out
 *
 * @class App
 *
 * @extends {Component}
 */
class App extends Component {
   /**
   * @description Creates an instance of App.
   * bind methods and set initial state.
	 *
   * @memberof App
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @method componentDidMount
   *
   * @description Adds an event Listener to the Store and fires
   * when the component is fully mounted.
   *
   * @return {void}
   *
   * @memberof App
   */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

    /**
    * @method componentUnmount
    *
    * @return {void}
    *
    * @description Removes event Listener from the Store
    *
    * @memberof App
    */
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

    /**
    * @method onChange
    *
    * @return {void}
    *
    * @description Monitors changes in the components and change the state
    *
    * @memberof App
    */
  onChange() {
    this.setState({
      isAuthenticated: AppStore.getAuthenticatedState(),
    });
  }

  /**
   * @memberof App
   *
   *  @return {jsx} rendered jsx element
   */
  render() {
    return (
      <div>
      {localStorage.getItem('user') == null ?
        <div className="row">
          <Navigation />
            <div className="row">
              <Routes
                isAuthenticated={this.state.isAuthenticated}
              />
            </div>
            <div className="row">
              <Footer />
            </div>
        </div> :
       <Dashboard />};
      </div>
    );
  }
}

export default App;
