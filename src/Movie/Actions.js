import { REQUEST_MOVIES, RECEIVE_MOVIES } from './ActionTypes';

import api from '../core/Api';

const requestAll = () => {
  return {
    type: REQUEST_MOVIES
  }
}

const receiveAll = (movies) => {
  return {
    type: RECEIVE_MOVIES,
    movies
  }
}

const fetchMovies = () => {
  return (dispatch) => {
    dispatch(requestAll());

    return api.fetchMovies()
      .then(
        json => dispatch(receiveAll(json))
      )
  }
}

export {
  requestAll,
  receiveAll,
  fetchMovies
}
