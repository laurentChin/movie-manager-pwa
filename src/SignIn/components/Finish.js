import React from "react";
import { Field, reduxForm } from "redux-form";

const finishForm = ({
  handleSubmit,
  submitHandler,
  finishSignIn,
  finishSuccess,
  loginLink
}) => {
  return (
    <>
      {finishSuccess && <span>Account created. You can now {loginLink}.</span>}
      {!finishSuccess && (
        <form onSubmit={handleSubmit(submitHandler(finishSignIn))}>
          <div className="formField">
            <label htmlFor="token">Account validation token</label>
            <Field name="token" component="input" type="text" required />
          </div>
          <div className="formActions">
            <button type="submit">Confirm Sign In</button>
          </div>
        </form>
      )}
    </>
  );
};

export default reduxForm({
  form: "signInFinish"
})(finishForm);
