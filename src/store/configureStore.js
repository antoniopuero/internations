import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from './apiMiddleware';

const finalCreateStore = compose(
  applyMiddleware(thunk, api),
  process.env.NODE_ENV === 'development' ? DevTools.instrument() : () => dispatch => action => dispatch(action)
)(createStore);

function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  return store;
}
export default configureStore({});
