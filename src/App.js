import React, { Component } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Home from "./Home";
import { MovieRouter } from "./Movie";
import { FlashMessage } from "./Core";
import { Loader } from "Core/components/Loader/Loader";
import { AuthRouter } from "Auth/router";

class App extends Component {
  componentDidMount() {
    if (
      !this.props.isAuthenticated &&
      !/^\/auth\/(log|sign)-in/.test(window.location.pathname)
    ) {
      window.location.replace("/auth/log-in");
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
              <Route path="auth/*" element={<AuthRouter />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Loader />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;
  const { loading } = state.loader;
  const { show: showFlash } = state.flash;
  return {
    isAuthenticated,
    loading,
    showFlash,
  };
};

export default connect(mapStateToProps)(App);
