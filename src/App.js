import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import "./App.css";

import Home from "./Home";
import { LogInForm, AuthContext } from "./Auth";
import { MovieRouter } from "./Movie";
import { Loader, FlashMessage } from "./core";
import { Router as SignInRouter } from "./SignIn";

class App extends Component {
  componentDidMount() {
    if (
      !this.props.isAuthenticated &&
      !/^\/login|signIn/.test(window.location.pathname)
    ) {
      window.location.replace("/login");
    }
  }

  render() {
    const { loading, showFlash, history } = this.props;
    let className = "main-container";
    if (loading) {
      className = `${className} ${className}--hidden`;
    }

    return (
      <AuthContext.Provider>
        {showFlash && <FlashMessage />}
        <div className={className}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movies" component={MovieRouter} />
              <Route path="/signin" component={SignInRouter} />
              <Route path="/login" component={LogInForm} />
            </Switch>
          </ConnectedRouter>
        </div>
        <Loader />
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  const { loading } = state.loader;
  const { show: showFlash } = state.flash;
  return {
    isAuthenticated,
    loading,
    showFlash
  };
};

export default connect(mapStateToProps)(App);
