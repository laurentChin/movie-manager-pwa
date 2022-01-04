import React from "react";
import { Route, Routes } from "react-router-dom";

import { StartForm, FinishForm } from "./containers";

export default ({ match }) => (
  <Routes>
    <Route exact path={`${match.path}/start`} element={StartForm} />
    <Route exact path={`${match.path}/finish`} element={FinishForm} />
  </Routes>
);
