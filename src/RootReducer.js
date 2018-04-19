import { combineReducers } from 'redux';

import movieReducer from './Movie/Reducer';
import authReducer from './Auth/Reducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
});

export default rootReducer;
