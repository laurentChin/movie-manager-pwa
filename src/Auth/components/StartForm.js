import React, { useState } from "react";
import { Link } from "react-router-dom";

import { startSignIn } from "Auth/graphql/client";
import { LOGIN_PAGE } from "Auth/constants";

import "./Form.css";

const SUCCESS = "success";
const INITIAL = "initial";
const FAILURE = "failure";

export const StartForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [processStatus, setProcessStatus] = useState(INITIAL);

  const passwordMatch = !!password && password === passwordConfirmation;
  const isFormValid = !!email && passwordMatch;

  return (
    <div className="authForm">
      {processStatus === SUCCESS && (
        <span>
          Account created. An e-mail has been sent to you to finish the creation
          process.
        </span>
      )}
      {processStatus === INITIAL && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startSignIn(email, password)
              .then(() => setProcessStatus(SUCCESS))
              .catch(() => setProcessStatus(FAILURE));
          }}
        >
          <div className="formField">
            <label htmlFor="email">E-mail address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              onChange={({ currentTarget: { value } }) => setEmail(value)}
              required
            />
          </div>
          <div className="formField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder=" "
              onChange={({ currentTarget: { value } }) => setPassword(value)}
              required
            />
          </div>
          <div className="formField">
            <label htmlFor="passwordConfirm">Password confirm</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder=" "
              onChange={({ currentTarget: { value } }) =>
                setPasswordConfirmation(value)
              }
              required
            />
          </div>
          <div className="formActions">
            <button type="submit" disabled={!isFormValid}>
              Sign In
            </button>
          </div>
          <Link to={LOGIN_PAGE}>Back to log in form</Link>
        </form>
      )}
    </div>
  );
};
