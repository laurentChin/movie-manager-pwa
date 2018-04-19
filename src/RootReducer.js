import { combineReducers } from 'redux';

import movieReducer from './Movie/Reducer';

const rootReducer = combineReducers({
  movies: movieReducer
});

export default rootReducer;
