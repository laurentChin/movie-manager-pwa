import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import { LogInForm } from "./containers";

const authRouter = ({ isAuthenticated }) => (
  <>
    {isAuthenticated && <Redirect to="/" />}
    {!isAuthenticated && (
      <div>
        <Switch>
          <Route exact path={match.path} component={LogInForm} />
        </Switch>
      </div>
    )}
  </>
);
