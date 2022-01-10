import jsonwebtoken from "jsonwebtoken";

import { GraphQLClient } from "../core";

import { queries } from "./graphql";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS
} from "./actionTypes";

export const fetchUser = () => {
  return (dispatch, getStore) => {
    const { auth } = getStore();

    const { email } = jsonwebtoken.decode(auth.jwt);
    dispatch({
      type: FETCH_USER_PENDING
    });

    GraphQLClient.query({
      query: queries.FETCH_USER,
      variables: {
        email
      }
    })
      .then(response => {
        const {
          data: { getUser: user }
        } = response;

        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: {
            ...user
          }
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_USER_FAILURE,
          payload: {
            error
          }
        });
      });
  };
};
