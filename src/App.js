import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {connect} from "react-redux";

import './App.css';

import Home from "./Home";
import { Auth, AuthContext } from "./Auth";
import { FormPage } from "./Movie";

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated && !/^\/login/.test(window.location.pathname)) {
      window.location.replace('/login');
    }
  }

  render() {
    return (
      <Router>
        <AuthContext.Provider>
          <Route exact path="/" component={Home}/>
          <Route exact path="/movies/create" component={FormPage}/>
          <Route path="/login" component={Auth}/>
        </AuthContext.Provider>
      </Router>
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
