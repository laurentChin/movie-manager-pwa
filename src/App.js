import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {connect} from "react-redux";

import './App.css';

import Home from "./Home";
import { Auth, AuthContext } from "./Auth";
import { MovieRouter } from "./Movie";
import { Loader }from "./core";

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated && !/^\/login/.test(window.location.pathname)) {
      window.location.replace('/login');
    }
  }

  render() {
    const { loading } = this.props;
    let className = 'main-container';
    if (loading) {
      className = `${className} ${className}--hidden`;
    }

    return (
      <AuthContext.Provider>
        <div className={className}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movies" component={MovieRouter} />
              <Route path="/login" component={Auth} />
            </Switch>
          </Router>
        </div>
        <Loader />
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = (state) => {
  const {isAuthenticated} = state.auth;
  const { loading } = state.loader;
  return {
    isAuthenticated,
    loading
  }
}

export default connect(mapStateToProps)(App);
