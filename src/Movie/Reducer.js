import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  MOVIE_REQUEST_PENDING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE
} from './ActionTypes';

const initialState = {
  isFetching: false,
  items: [],
  movie: {},
  isProcessingCreation: false
};

const movieReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_MOVIES:
      return {
        ...state,
        isFetching: false,
        items: action.movies
      }
    case MOVIE_CREATION_PENDING:
      return {
        ...state,
        isProcessingCreation: true,
        creationDone: false
      }
    case MOVIE_CREATION_SUCCESS:
      return {
        ...state,
        isProcessingCreation: false,
        creationDone: true
      }
    case MOVIE_CREATION_FAILURE:
      return {
        ...state,
        isProcessingCreation: false,
        creationDone: false,
        error: action.e
      }
    case MOVIE_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true
      }
    case MOVIE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movie: action.movie
      }
    case MOVIE_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.e
      }
    default:
      return state;
  }
}

export default movieReducer;
