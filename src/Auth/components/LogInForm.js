import React from "react";
import { Field, reduxForm } from "redux-form";

import "./Login.css";

const logInForm = ({
  isAuthenticated,
  handleSubmit,
  submitHandler,
  logIn,
  redirect,
  signInLink
}) => (
  <>
    {isAuthenticated && redirect}
    {!isAuthenticated && (
      <form onSubmit={handleSubmit(submitHandler(logIn))}>
        <div className="formField">
          <label htmlFor="email">E-mail address</label>
          <Field name="email" component="input" type="email" required />
        </div>
        <div className="formField">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" required />
        </div>
        <div className="formActions">
          <button type="submit">Log In</button>
        </div>
        {signInLink}
      </form>
    )}
  </>
);

export default reduxForm({
  form: "logIn"
})(logInForm);
