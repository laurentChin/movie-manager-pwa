import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";

import { LogIn, Success } from "..";

class Auth extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        {this.props.isAuthenticated && <Redirect to="/" />}
        {!this.props.isAuthenticated && (
          <div>
            <Switch>
              <Route exact path={match.path} component={LogIn} />
              <Route exact path={match.path + "/success"} component={Success} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, isAuthenticated } = state.auth;
  return {
    isFetching,
    isAuthenticated
  };
};

export default connect(mapStateToProps)(Auth);
