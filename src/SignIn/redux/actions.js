import {
  SIGN_IN_START_REQUEST_PENDING,
  SIGN_IN_START_REQUEST_FAILURE,
  SIGN_IN_START_REQUEST_SUCCESS
} from "./actionTypes";

import ApolloClient from "../../core/GraphQLClient";
import { mutations } from "../graphql";

export const startSignIn = (email, password) => {
  return dispatch => {
    ApolloClient.mutate({
      mutation: mutations.SIGN_IN,
      variables: {
        email,
        password
      }
    })
      .then(() => {
        dispatch({
          type: SIGN_IN_START_REQUEST_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: SIGN_IN_START_REQUEST_FAILURE,
          payload: {
            error: error.toString()
          }
        });
      });
    dispatch({
      type: SIGN_IN_START_REQUEST_PENDING
    });
  };
};
