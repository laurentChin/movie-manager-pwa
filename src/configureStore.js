import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './RootReducer';

const configureStore = ()  => {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
}

export default configureStore;