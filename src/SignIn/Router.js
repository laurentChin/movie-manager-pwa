import React from "react";
import { Route, Routes } from "react-router-dom";

import { FinishForm } from "./containers";

export const SignInRouter = () => (
  <Routes>
    <Route exact path="finish" element={FinishForm} />
  </Routes>
);
