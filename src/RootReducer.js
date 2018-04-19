import { combineReducers } from 'redux';

import movieReducer from './Movie/Reducer';

const rootReducer = combineReducers({
  movieReducer
});

export default rootReducer;
