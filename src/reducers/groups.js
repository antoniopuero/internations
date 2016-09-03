import _ from 'lodash';
import {CALL_API, LOADING, LOADED, FAILED} from '../constants';
import * as groupApi from '../api/groups';
import * as userApi from '../api/users';
import {combineReducers} from 'redux';
import {REMOVE_USER_FROM_GROUP_SUCCESS} from './users';

const GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST';
const GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS';
const GET_GROUPS_FAILED = 'GET_GROUPS_FAILED';

const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
const GET_GROUP_FAILED = 'GET_GROUP_FAILED';

const REMOVE_GROUP_REQUEST = 'REMOVE_GROUP_REQUEST';
const REMOVE_GROUP_SUCCESS = 'REMOVE_GROUP_SUCCESS';
const REMOVE_GROUP_FAILED = 'REMOVE_GROUP_FAILED';

const CHANGE_GROUP_TO_CREATE = 'CHANGE_GROUP_TO_CREATE';
const CHANGE_GROUP_TO_CREATE_ERROR = 'CHANGE_GROUP_TO_CREATE_ERROR';
const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED';

const CHANGE_USER_TO_ADD = 'CHANGE_USER_TO_ADD';
const CHANGE_USER_TO_ADD_ERROR = 'CHANGE_USER_TO_ADD_ERROR';
const CLEAR_USER_TO_ADD = 'CLEAR_USER_TO_ADD';
const ADD_USER_TO_GROUP_REQUEST = 'ADD_USER_TO_GROUP_REQUEST';
const ADD_USER_TO_GROUP_SUCCESS = 'ADD_USER_TO_GROUP_SUCCESS';
const ADD_USER_TO_GROUP_FAILED = 'ADD_USER_TO_GROUP_FAILED';

export function changeGroupToCreate(updatedFields) {
  return {
    type: CHANGE_GROUP_TO_CREATE,
    updatedFields
  };
}

export function changeGroupToCreateError(errorFields) {
  return {
    type: CHANGE_GROUP_TO_CREATE_ERROR,
    errorFields
  };
}

export function createGroup() {
  return async (dispatch, getState) => {
    const {
      groups: {
        groupToCreate: {
          value: data
        }
      }
    } = getState();

    return dispatch({
      [CALL_API]: {
        types: [CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAILED],
        fn: groupApi.createGroup.bind(null, {data})
      }
    });
  };
}


export function getGroups() {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [GET_GROUPS_REQUEST, GET_GROUPS_SUCCESS, GET_GROUPS_FAILED],
        fn: groupApi.getGroups.bind(null)
      }
    });
  };
}

export function getGroup(id) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_FAILED],
        fn: groupApi.getGroup.bind(null, {params: {id}})
      }
    });
  };
}

export function removeGroup(id) {
  return async (dispatch) => {

    return dispatch({
      [CALL_API]: {
        types: [REMOVE_GROUP_REQUEST, REMOVE_GROUP_SUCCESS, REMOVE_GROUP_FAILED],
        fn: groupApi.removeGroup.bind(null, {params: {id}})
      }
    });
  };
}

export function changeUserToAdd(updatedFields) {
  return {
    type: CHANGE_USER_TO_ADD,
    updatedFields
  };
}

export function clearUserToAdd(updatedFields) {
  return {
    type: CLEAR_USER_TO_ADD,
    updatedFields
  };
}

export function changeUserToAddError(errorFields) {
  return {
    type: CHANGE_USER_TO_ADD_ERROR,
    errorFields
  };
}

export function addUserToGroup() {
  return async (dispatch, getState) => {
    const {
      groups: {
        group: {
          value: {
            id: groupId
          }
        },
        userToAdd: {
          value: {userId}
        }
      }
    } = getState();

    return dispatch({
      [CALL_API]: {
        types: [ADD_USER_TO_GROUP_REQUEST, ADD_USER_TO_GROUP_SUCCESS, ADD_USER_TO_GROUP_FAILED],
        fn: userApi.addUserToGroup.bind(null, {params: {userId, groupId}})
      }
    });
  };
}

const groupInitialState = {
  list: {
    fetchStatus: {},
    value: []
  },
  group: {
    fetchStatus: {},
    removeStatus: {},
    value: {
      users: []
    }
  },
  groupToCreate: {
    value: {},
    errors: {
      $isPristine: true
    },
    createStatus: {}
  },
  userToAdd: {
    value: {},
    errors: {
      $isPristine: true
    },
    addStatus: {}
  }
};

function list(state=groupInitialState.list, action) {
  switch (action.type) {
    case GET_GROUPS_REQUEST:
      return {
        ...state,
        fetchStatus: {
          value: LOADING
        }
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        value: action.value,
        fetchStatus: {
          value: LOADED
        }
      };
    case GET_GROUPS_FAILED:
      return {
        ...state,
        fetchStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case REMOVE_GROUP_SUCCESS:
      const deletedGroupIndex = _.findIndex(state.value, {id: action.value.id});

      if (deletedGroupIndex < 0) {
        return state;
      }
      return {
        ...state,
        value: [
          ...state.value.slice(0, deletedGroupIndex),
          ...state.value.slice(deletedGroupIndex + 1)
        ]
      };
    default:
      return state;
  }
}


function group(state=groupInitialState.group, action) {
  switch (action.type) {
    case REMOVE_GROUP_REQUEST:
      return {
        ...state,
        removeStatus: {
          value: LOADING
        }
      };
    case REMOVE_GROUP_SUCCESS:
      return {
        ...state,
        removeStatus: {
          value: LOADED,
          message: 'Group has been deleted successfully'
        }
      };
    case REMOVE_GROUP_FAILED:
      return {
        ...state,
        removeStatus: {
          value: FAILED,
          message: action.error
        }
      };
    case GET_GROUP_REQUEST:
      return {
        ...state,
        fetchStatus: {
          value: LOADING
        }
      };
    case GET_GROUP_SUCCESS:
      return {
        ...state,
        value: action.value,
        fetchStatus: {
          value: LOADED
        }
      };
    case GET_GROUP_FAILED:
      return {
        ...state,
        fetchStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case REMOVE_USER_FROM_GROUP_SUCCESS:
      const userIndex = _.findIndex(state.value.users, {id: action.value.userId});

      if (userIndex < 0) {
        return state;
      }

      return {
        ...state,
        value: {
          ...state.value,
          users: [
            ...state.value.users.slice(0, userIndex),
            ...state.value.users.slice(userIndex + 1)
          ]
        }
      };

    case ADD_USER_TO_GROUP_SUCCESS:
      return {
        ...state,
        value: {
          ...state.value,
          users: [
            ...state.value.users,
            action.value
          ]
        }
      };

    case GET_GROUPS_REQUEST:
      return groupInitialState.group;

    default:
      return state;
  }
}

function groupToCreate(state=groupInitialState.groupToCreate, action) {
  switch (action.type) {
    case CHANGE_GROUP_TO_CREATE:
      return {
        ...state,
        value: {
          ...state.value,
          ...action.updatedFields
        }
      };
    case CHANGE_GROUP_TO_CREATE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errorFields,
          $isPristine: false
        }
      };
    case CREATE_GROUP_REQUEST:
      return {
        ...state,
        createStatus: {
          value: LOADING
        }
      };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        value: {
          ...state.value,
          id: action.value.id
        },
        createStatus: {
          value: LOADED,
          message: 'Group has been created successfully'
        }
      };
    case CREATE_GROUP_FAILED:
      return {
        ...state,
        createStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case GET_GROUPS_REQUEST:
      return groupInitialState.groupToCreate;
    default:
      return state;
  }
}

function userToAdd(state=groupInitialState.userToAdd, action) {
  switch (action.type) {

    case CHANGE_USER_TO_ADD:
      return {
        ...state,
        value: {
          ...state.value,
          ...action.updatedFields
        }
      };
    case CHANGE_USER_TO_ADD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errorFields,
          $isPristine: false
        }
      };
    case ADD_USER_TO_GROUP_REQUEST:
      return {
        ...state,
        addStatus: {
          value: LOADING
        }
      };
    case ADD_USER_TO_GROUP_SUCCESS:
      return {
        ...state,
        value: action.value,
        addStatus: {
          value: LOADED,
          message: 'Group has been created successfully'
        }
      };
    case ADD_USER_TO_GROUP_FAILED:
      return {
        ...state,
        addStatus: {
          value: FAILED,
          message: action.error
        }
      };

    case GET_GROUPS_REQUEST:
    case CLEAR_USER_TO_ADD:
      return groupInitialState.userToAdd;

    default:
      return state;
  }
}

export default combineReducers({
  list,
  group,
  groupToCreate,
  userToAdd
});