import {CALL_API} from '../constants';

export default () => dispatch => async action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return dispatch(action);
  }

  let { fn, types, dataToDispatch } = callAPI;

  if (typeof fn !== 'function') {
    throw new Error('Expected a function as method.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;

  dispatch(actionWith({ type: requestType, ...dataToDispatch}));

  try {
    let value = await fn();
    dispatch(actionWith({ type: successType, ...dataToDispatch, value }));
    return value;
  } catch (e) {
    dispatch({type: 'GLOBAL_ERROR', error: ''});
    setTimeout(() => {
      dispatch({type: 'GLOBAL_ERROR', error: e.message});
    }, 100);
    return dispatch(actionWith({ type: failureType, error: e.message, ...dataToDispatch }));
  }

};
