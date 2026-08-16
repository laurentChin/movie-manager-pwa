import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import { Home } from "Home";
import { MovieRouter } from "./Movie";
import { CreationPage } from "Movie/pages/CreationPage";
import { FlashMessage } from "Core/components/FlashMessage/FlashMessage";
import { Loader } from "Core/components/Loader/Loader";
import { AuthRouter } from "Auth/router";

// Renders the movie creation dialog "over" whichever page was active
// before it was opened, instead of replacing it, so the grid stays
// visible behind the dialog on desktop.
function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route exact path="/" element={<Home />} />
        <Route path="movies/*" element={<MovieRouter />} />
        <Route path="auth/*" element={<AuthRouter />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="movies/create" element={<CreationPage />} />
        </Routes>
      )}
    </>
  );
}

function App({ isAuthenticated, loading, showFlash }) {
  useEffect(() => {
    if (
      !isAuthenticated &&
      !/^\/auth\/(log|sign)-in/.test(window.location.pathname)
    ) {
      window.location.replace("/auth/log-in");
    }
  }, [isAuthenticated]);

  let className = "main-container";
  if (loading) {
    className = `${className} ${className}--hidden`;
  }

  return (
    <>
      {showFlash && <FlashMessage />}
      <div className={className}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
      <Loader />
    </>
  );
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
