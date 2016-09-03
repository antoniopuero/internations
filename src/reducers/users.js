import _ from 'lodash';
import {CALL_API, LOADING, LOADED, FAILED} from '../constants';
import * as userApi from '../api/users';
import {combineReducers} from 'redux';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILED = 'GET_USER_FAILED';

const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
const REMOVE_USER_FAILED = 'REMOVE_USER_FAILED';

const CHANGE_USER_TO_CREATE = 'CHANGE_USER_TO_CREATE';
const CHANGE_USER_TO_CREATE_ERROR = 'CHANGE_USER_TO_CREATE_ERROR';
const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

const REMOVE_USER_FROM_GROUP_REQUEST = 'REMOVE_USER_FROM_GROUP_REQUEST';
export const REMOVE_USER_FROM_GROUP_SUCCESS = 'REMOVE_USER_FROM_GROUP_SUCCESS';
const REMOVE_USER_FROM_GROUP_FAILED = 'REMOVE_USER_FROM_GROUP_FAILED';

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

export function getUser(id) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED],
        fn: userApi.getUser.bind(null, {params: {id}})
      }
    });
  };
}

export function removeUser(id) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [REMOVE_USER_REQUEST, REMOVE_USER_SUCCESS, REMOVE_USER_FAILED],
        fn: userApi.removeUser.bind(null, {params: {id}})
      }
    });
  };
}

export function changeUserToCreate(updatedFields) {
  return {
    type: CHANGE_USER_TO_CREATE,
    updatedFields
  };
}

export function changeUserToCreateError(errorFields) {
  return {
    type: CHANGE_USER_TO_CREATE_ERROR,
    errorFields
  };
}

export function createUser() {
  return async (dispatch, getState) => {
    const {
      users: {
        userToCreate: {
          value: data
        }
      }
    } = getState();

    return dispatch({
      [CALL_API]: {
        types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILED],
        fn: userApi.createUser.bind(null, {data})
      }
    });
  };
}

export function removeUserFromGroup(userId, groupId) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [REMOVE_USER_FROM_GROUP_REQUEST, REMOVE_USER_FROM_GROUP_SUCCESS, REMOVE_USER_FROM_GROUP_FAILED],
        fn: userApi.removeUserFromGroup.bind(null, {params: {userId, groupId}})
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
    value: {
      groups: []
    }
  },
  userToCreate: {
    value: {},
    errors: {
      $isPristine: true
    },
    createStatus: {}
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

    case REMOVE_USER_SUCCESS:
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
    case REMOVE_USER_REQUEST:
      return {
        ...state,
        removeStatus: {
          value: LOADING
        }
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        removeStatus: {
          value: LOADED,
          message: 'User has been deleted successfully'
        }
      };
    case REMOVE_USER_FAILED:
      return {
        ...state,
        removeStatus: {
          value: FAILED,
          message: action.error
        }
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        fetchStatus: {
          value: LOADING
        }
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        value: action.value,
        fetchStatus: {
          value: LOADED
        }
      };
    case GET_USER_FAILED:
      return {
        ...state,
        fetchStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case REMOVE_USER_FROM_GROUP_SUCCESS:
      const groupIndex = _.findIndex(state.value.groups, {id: action.value.groupId});

      if (groupIndex < 0) {
        return state;
      }

      return {
        ...state,
        value: {
          ...state.value,
          groups: [
            ...state.value.groups.slice(0, groupIndex),
            ...state.value.groups.slice(groupIndex + 1)
          ]
        }
      };

    case GET_USERS_REQUEST:
      return userInitialState.user;
    default:
      return state;
  }
}

function userToCreate(state=userInitialState.userToCreate, action) {
  switch (action.type) {
    case CHANGE_USER_TO_CREATE:
      return {
        ...state,
        value: {
          ...state.value,
          ...action.updatedFields
        }
      };
    case CHANGE_USER_TO_CREATE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errorFields,
          $isPristine: false
        }
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createStatus: {
          value: LOADING
        }
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        value: {
          ...state.value,
          id: action.value.id
        },
        createStatus: {
          value: LOADED,
          message: 'User has been created successfully'
        }
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        createStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case GET_USERS_REQUEST:
      return userInitialState.userToCreate;

    default:
      return state;
  }
}

export default combineReducers({
  list,
  user,
  userToCreate
});