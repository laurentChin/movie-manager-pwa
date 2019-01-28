import React from "react";
import { Field, reduxForm } from "redux-form";

const startForm = ({
  handleSubmit,
  submitHandler,
  validatePasswordConfirmation,
  startSignIn,
  startSuccess
}) => {
  return (
    <>
      {startSuccess && (
        <span>
          Account created. An e-mail has been sent to you to finish the creation
          process.
        </span>
      )}
      {!startSuccess && (
        <form onSubmit={handleSubmit(submitHandler(startSignIn))}>
          <div className="formField">
            <label htmlFor="email">E-mail address</label>
            <Field name="email" component="input" type="email" required />
          </div>
          <div className="formField">
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" required />
          </div>
          <div className="formField">
            <label htmlFor="passwordConfirm">Password confirm</label>
            <Field
              name="passwordConfirm"
              component="input"
              type="password"
              validate={validatePasswordConfirmation}
              required
            />
          </div>
          <div className="formActions">
            <button type="submit">Sign In</button>
          </div>
        </form>
      )}
    </>
  );
};

export default reduxForm({
  form: "signInStart"
})(startForm);
