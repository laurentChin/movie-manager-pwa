import React, { Component } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Home from "./Home";
import { LogInForm } from "./Auth";
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
    const { loading, showFlash } = this.props;
    let className = "main-container";
    if (loading) {
      className = `${className} ${className}--hidden`;
    }

    return (
      <>
        {showFlash && <FlashMessage />}
        <div className={className}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="movies/*" element={<MovieRouter />} />
              <Route path="/signin" element={<SignInRouter />} />
              <Route path="/login" element={<LogInForm />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Loader />
      </>
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
