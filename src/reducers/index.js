import {combineReducers} from 'redux';
import users from './users';
import groups from './groups';

function globalError(state = {}, action) {
  switch (action.type) {
    case 'GLOBAL_ERROR':
      return {
        message: action.error
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users,
  groups,
  globalError
});

export default rootReducer;
