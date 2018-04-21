import {
  FETCH_FORMAT_LIST_PENDING,
  FETCH_FORMAT_LIST_SUCCESS,
  FETCH_FORMAT_LIST_FAILURE
} from './ActionTypes';

import { api } from '../core';

const fetchFormats = () => {
  return dispatch => {
    dispatch({
      type: FETCH_FORMAT_LIST_PENDING
    });
    api.fetchFormats()
      .then(formats => {
        dispatch({
          type: FETCH_FORMAT_LIST_SUCCESS,
          formats
        });
      })
      .catch(e => {
        dispatch({
          type: FETCH_FORMAT_LIST_FAILURE,
          error: e
        });
      })
  }
}

export {
  fetchFormats
}
