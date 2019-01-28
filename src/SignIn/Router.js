import React from "react";
import { Route, Switch } from "react-router-dom";

import { StartForm } from "./containers";

export default ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/start`} component={StartForm} />
  </Switch>
);
