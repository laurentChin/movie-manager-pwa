import {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "./ActionTypes";

import Cookies from "js-cookie";

import { GraphQLClient, authenticateGraphQLClient } from "../core";

import { queries } from "./graphql";
import { fetchUser } from "../User/actions";

export const logIn = (email, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST_PENDING
    });

    GraphQLClient.query({
      query: queries.LOG_IN,
      variables: {
        email,
        password
      }
    })
      .then(response => {
        const {
          data: {
            login: { jwt }
          }
        } = response;

        Cookies.set("jwt", jwt);

        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(jwt);
        }

        authenticateGraphQLClient(jwt);

        dispatch({
          type: LOGIN_REQUEST_SUCCESS,
          payload: { jwt },
          flashMessage: `Successfully logged in as ${email}.`
        });

        dispatch(fetchUser());
      })
      .catch(error => {
        Cookies.remove("jwt");

        dispatch({
          type: LOGIN_REQUEST_FAILURE,
          payload: {
            error: error.toString()
          },
          flashMessage: `Log In failed for ${email}.`
        });
      });
  };
};
