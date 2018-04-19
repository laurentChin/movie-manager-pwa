import { combineReducers } from 'redux';

import movies from './Movie/Reducer';

const rootReducer = combineReducers({
  movies
});

export default rootReducer;