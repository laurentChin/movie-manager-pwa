import {
  MOVIES_REQUEST_PENDING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE,
  MOVIE_BULK_IMPORT_PENDING,
  MOVIE_BULK_IMPORT_SUCCESS,
  MOVIE_BULK_IMPORT_FAILURE,
  MOVIE_SELECT,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_DELETE_SUCCESS
} from "./ActionTypes";
import { orderBy } from "natural-orderby";

const initialState = {
  isFetching: false,
  items: [],
  offset: 0,
  selected: null,
  isProcessingCreation: false,
  hasMoreToFetch: true
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case MOVIES_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...new Set([...state.items, ...action.movies])],
        offset: action.offset,
        hasMoreToFetch: action.hasMoreToFetch
      };
    case MOVIES_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case MOVIE_CREATION_PENDING:
      return {
        ...state,
        isProcessingCreation: true,
        creationDone: false
      };
    case MOVIE_CREATION_SUCCESS:
      return {
        ...state,
        items: orderBy([...state.items, action.movie], "title", "asc"),
        isProcessingCreation: false,
        creationDone: true
      };
    case MOVIE_CREATION_FAILURE:
      return {
        ...state,
        isProcessingCreation: false,
        creationDone: false,
        error: action.e
      };
    case MOVIE_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(movie => movie.id !== action.id)
      };
    case MOVIE_BULK_IMPORT_PENDING:
      return {
        ...state,
        isProcessingImport: true,
        importDone: false
      };
    case MOVIE_BULK_IMPORT_SUCCESS:
      return {
        ...state,
        isProcessingImport: false,
        importDone: true
      };
    case MOVIE_BULK_IMPORT_FAILURE:
      return {
        ...state,
        isProcessingImport: false,
        importDone: false,
        error: action.e
      };
    case MOVIE_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(movie => {
          if (movie.id === action.movie.id) {
            return action.movie;
          }

          return movie;
        })
      };
    case MOVIE_SELECT:
      return {
        ...state,
        selected: action.movie
      };
    default:
      return state;
  }
};

export default movieReducer;
