import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import { LogIn, Success } from './';

class Auth extends Component {
  render () {
    const { match } = this.props;

    return (
      <div>
        {this.props.isAuthenticated && <Redirect to="/" />}
        {!this.props.isAuthenticated && <div>
          <Route exact path="" component={ LogIn } />
          <Route path={ match.path + '/success'} component={Success} />
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {isFetching, isAuthenticated} = state.auth;
  return {
    isFetching,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Auth);
