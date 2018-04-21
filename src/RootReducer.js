import { combineReducers } from 'redux';

import {reducer as formReducer} from 'redux-form';

import movieReducer from './Movie/Reducer';
import authReducer from './Auth/Reducer';
import formatReducer from "./Format/Reducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  form: formReducer,
  format: formatReducer
});

export default rootReducer;
