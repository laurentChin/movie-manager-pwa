import jwtDecode from "jwt-decode";

import { GraphQLClient } from "../Core";

import { FETCH_USER } from "User/graphql/queries";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
} from "./actionTypes";

export const fetchUser = () => {
  return (dispatch, getStore) => {
    const { auth } = getStore();

    const { email } = jwtDecode(auth.jwt);
    dispatch({
      type: FETCH_USER_PENDING,
    });

    GraphQLClient.query({
      query: FETCH_USER,
      variables: {
        email,
      },
    })
      .then((response) => {
        const {
          data: { getUser: user },
        } = response;

        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: {
            ...user,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_FAILURE,
          payload: {
            error,
          },
        });
      });
  };
};
