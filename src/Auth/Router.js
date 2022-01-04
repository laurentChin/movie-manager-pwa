import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LogInForm } from "./containers";

const authRouter = ({ isAuthenticated }) => (
  <>
    {isAuthenticated && <Route element={() => <Navigate replace to="/" />} />}
    {!isAuthenticated && (
      <div>
        <Routes>
          <Route exact path={match.path} component={LogInForm} />
        </Routes>
      </div>
    )}
  </>
);
