import React from "react";
import { Route, Routes } from "react-router-dom";

import { LogInForm } from "Auth/components/LogInForm";
import { StartForm } from "Auth/components/StartForm";

export const AuthRouter = () => (
  <Routes>
    <Route exact path="log-in" element={<LogInForm />} />
    <Route exact path="sign-in/start" element={<StartForm />} />
  </Routes>
);
