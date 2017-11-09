import React from 'react';


/**
 * @description The Default Page when the user logs in
 *
 * @class WelcomeBoard
 *
 * @extends {Component}
 */
const WelcomeBoard = () => ({
  render() {
    return (
        <div className="container" id="main">
            <div className="row">
                <div className="col-md-12" >
                    <div className="viewMessageBoard">
                        <div className="container" >
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <center>
                                    <h3>Welcome {this.props.userName}</h3>
                                </center>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
});

export default WelcomeBoard;
