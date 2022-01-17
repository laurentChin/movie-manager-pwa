import React from "react";
import { Route, Routes } from "react-router-dom";

import { LogInForm } from "Auth/components/LogInForm";
import { StartForm } from "Auth/components/StartForm";
import { FinishForm } from "Auth/components/FinishForm";

export const AuthRouter = () => (
  <Routes>
    <Route exact path="log-in" element={<LogInForm />} />
    <Route exact path="sign-in/start" element={<StartForm />} />
    <Route exact path="sign-in/finish" element={<FinishForm />} />
  </Routes>
);
