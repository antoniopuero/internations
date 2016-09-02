import {CALL_API, LOADING, LOADED, FAILED} from '../constants';
import * as userApi from '../api/user';
import {combineReducers} from 'redux';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

export function getUsers() {
  return async (dispatch, getState) => {

    return dispatch({
      [CALL_API]: {
        types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILED],
        fn: userApi.getUsers.bind(null)
      }
    });
  };
}

const userInitialState = {
  users: {
    fetchStatus: {},
    value: []
  }
};

function list(state=userInitialState.users, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        fetchStatus: {
          value: LOADING
        }
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        value: action.value,
        fetchStatus: {
          value: LOADED
        }
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        fetchStatus: {
          value: FAILED,
          message: action.error
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  list
});