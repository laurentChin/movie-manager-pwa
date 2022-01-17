import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LOGIN_PAGE } from "Auth/constants";
import { finishSignIn } from "Auth/graphql/client";

const INITIAL = "initial";
const SUCCESS = "success";
const FAILURE = "failure";

export const FinishForm = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(INITIAL);

  useEffect(() => {
    if (location.search) {
      setToken(location.search.replace("?token=", ""));
    }
  }, [location, setToken]);

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
              name="token"
              type="text"
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
