import React from "react";
import { Route, Switch } from "react-router-dom";

import { StartForm, FinishForm } from "./containers";

export default ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/start`} component={StartForm} />
    <Route exact path={`${match.path}/finish`} component={FinishForm} />
  </Switch>
);
