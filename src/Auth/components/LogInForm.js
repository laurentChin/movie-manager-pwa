import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HOME_PAGE } from "../../constants";
import { SIGN_IN_PAGE } from "Auth/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "Auth/selectors";
import { logIn } from "Auth/Actions";

import "./Form.css";

export const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    navigate(HOME_PAGE);
  }

  return (
    <div className="authForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(logIn(email, password));
        }}
      >
        <div className="formField">
          <label htmlFor="email">E-mail address</label>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={({ currentTarget: { value } }) => setEmail(value)}
          />
        </div>
        <div className="formField">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </div>
        <div className="formActions">
          <button type="submit">Log In</button>
        </div>
        <Link to={SIGN_IN_PAGE}>Create an account</Link>
      </form>
    </div>
  );
};
