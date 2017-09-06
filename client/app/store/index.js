import reducer from '../reducers';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const loggerMiddleware = createLogger({
  predicate: (getState, action) => true //development
});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}


export const store = configureStore({});
