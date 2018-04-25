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

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated && !/^\/login/.test(window.location.pathname)) {
      window.location.replace('/login');
    }
  }

  render() {
    return (
      <AuthContext.Provider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={MovieRouter} />
            <Route path="/login" component={Auth} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = (state) => {
  const {isAuthenticated} = state.auth;
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
