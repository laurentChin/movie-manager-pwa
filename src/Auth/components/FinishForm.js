import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LOGIN_PAGE } from "Auth/constants";
import { finishSignIn } from "Auth/graphql/client";

import "./Form.css";

const INITIAL = "initial";
const SUCCESS = "success";
const FAILURE = "failure";

export const FinishForm = () => {
  const location = useLocation();
  const [token, setToken] = useState(() =>
    location.search ? location.search.replace("?token=", "") : ""
  );
  const [status, setStatus] = useState(INITIAL);

  return (
    <div className="authForm">
      {status === SUCCESS && (
        <span>
          Account created. You can now <Link to={LOGIN_PAGE}>log in</Link>.
        </span>
      )}
      {status === (INITIAL || FAILURE) && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            finishSignIn(token)
              .then(() => setStatus(SUCCESS))
              .catch(() => setStatus(FAILURE));
          }}
        >
          <div className="formField">
            <label htmlFor="token">Account validation token</label>
            <input
              id="token"
              name="token"
              type="text"
              placeholder=" "
              onChange={({ currentTarget: { value } }) => setToken(value)}
              value={token}
              required
            />
          </div>
          <div className="formActions">
            <button type="submit">Confirm Sign In</button>
          </div>
        </form>
      )}
    </div>
  );
};
