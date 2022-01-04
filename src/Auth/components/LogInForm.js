import React from "react";
import { Field, reduxForm } from "redux-form";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants";
import { SIGN_IN_PAGE } from "../../SignIn/constants";

const LogInForm = ({
  isAuthenticated,
  handleSubmit,
  submitHandler,
  logIn,
}) => {
  const navigate = useNavigate()

  if(isAuthenticated) {
    navigate(HOME_PAGE);
  }

  return (
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
      <Link to={SIGN_IN_PAGE}>Create an account</Link>
    </form>
  )
};

export default reduxForm({
  form: "logIn"
})(LogInForm);
