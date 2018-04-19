import { REQUEST_MOVIES, RECEIVE_MOVIES } from './ActionTypes';

import api from '../core/Api';

export const requestAll = () => {
  return {
    type: REQUEST_MOVIES
  }
}

export const receiveAll = (movies) => {
  return {
    type: RECEIVE_MOVIES,
    movies
  }
}

export const fetchMovies = () => {
  return (dispatch) => {
    dispatch(requestAll());

    return api.fetchMovies()
      .then(
        json => dispatch(receiveAll(json))
      )
  }
}
