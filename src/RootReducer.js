import { combineReducers } from 'redux';

import {reducer as formReducer} from 'redux-form';

import movieReducer from './Movie/Reducer';
import authReducer from './Auth/Reducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
