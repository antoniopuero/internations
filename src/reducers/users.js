import _ from 'lodash';
import {CALL_API, LOADING, LOADED, FAILED} from '../constants';
import * as userApi from '../api/user';
import {combineReducers} from 'redux';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

const REMOVE_USERS_REQUEST = 'REMOVE_USERS_REQUEST';
const REMOVE_USERS_SUCCESS = 'REMOVE_USERS_SUCCESS';
const REMOVE_USERS_FAILED = 'REMOVE_USERS_FAILED';

export function getUsers() {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILED],
        fn: userApi.getUsers.bind(null)
      }
    });
  };
}

export function removeUser(id) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [REMOVE_USERS_REQUEST, REMOVE_USERS_SUCCESS, REMOVE_USERS_FAILED],
        fn: userApi.removeUser.bind(null, {params: {id}})
      }
    });
  };
}

const userInitialState = {
  list: {
    fetchStatus: {},
    value: []
  },
  user: {
    fetchStatus: {},
    removeStatus: {},
    value: {}
  }
};

function list(state=userInitialState.list, action) {
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

    case REMOVE_USERS_SUCCESS:
      const deletedUserIndex = _.findIndex(state.value, {id: action.value.id});

      if (deletedUserIndex < 0) {
        return state;
      }
      return {
        ...state,
        value: [
          ...state.value.slice(0, deletedUserIndex),
          ...state.value.slice(deletedUserIndex + 1)
        ]
      };
    default:
      return state;
  }
}

function user(state=userInitialState.user, action) {
  switch (action.type) {
    case REMOVE_USERS_REQUEST:
      return {
        ...state,
        removeStatus: {
          value: LOADING
        }
      };
    case REMOVE_USERS_SUCCESS:
      return {
        ...state,
        value: action.value,
        removeStatus: {
          value: LOADED
        }
      };
    case REMOVE_USERS_FAILED:
      return {
        ...state,
        removeStatus: {
          value: FAILED,
          message: action.error
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  list,
  user
});