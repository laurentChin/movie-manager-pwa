import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE
} from './ActionTypes';

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

const createMovie = (movie) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_CREATION_PENDING
    });

    return api.createMovie(movie)
      .then(
        json => dispatch({
          type: MOVIE_CREATION_SUCCESS,
          movie: json
        })
      )
      .catch(e => {
        dispatch({
          type: MOVIE_CREATION_FAILURE,
          error: e
        })
      })
  }
}

export {
  requestAll,
  receiveAll,
  fetchMovies,
  createMovie
}
