import { combineReducers } from 'redux';

import movies from './Movie/Reducers';

const rootReducer = combineReducers({
  movies
});

export default rootReducer;