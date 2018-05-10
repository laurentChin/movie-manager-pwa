import {
  MOVIES_REQUEST_PENDING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_FAILURE,
  MOVIE_REQUEST_PENDING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE,
  MOVIE_BULK_IMPORT_PENDING,
  MOVIE_BULK_IMPORT_SUCCESS,
  MOVIE_BULK_IMPORT_FAILURE
} from './ActionTypes';

const initialState = {
  isFetching: false,
  items: [],
  movie: {},
  isProcessingCreation: false
};

const movieReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case MOVIES_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true
      }
    case MOVIES_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.movies
      }
    case MOVIES_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
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
    case MOVIE_BULK_IMPORT_PENDING:
      return {
        ...state,
        isProcessingImport: true,
        importDone: false
      }
    case MOVIE_BULK_IMPORT_SUCCESS:
      return {
        ...state,
        isProcessingImport: false,
        importDone: true
      }
    case MOVIE_BULK_IMPORT_FAILURE:
      return {
        ...state,
        isProcessingImport: false,
        importDone: false,
        error: action.e
      }
    default:
      return state;
  }
}

export default movieReducer;
