"use strict";

import * as types from '../constants/action.types';

export default function manageWorkload(state = {
  route: '/cattle/list',
  cattle: {}
}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.GO_TO_EDIT_CATTLE:
      newState.route = '/cattle/register';
      newState.cattle = action.cattle;
      return newState;
    case types.REMOVE_CATTLE:
      newState.removeSuccess = true;
      return newState;
    case types.REMOVE_CATTLE_RUNNING:
      newState.removeSuccess = false;
      return newState;
    case types.REMOVE_FAIL:
      newState.removeSuccess = false;
      return newState;
    case types.CATTLE_LIST_RUNNING:
      newState.saveErrorMessage = '';
      newState.cattleHasLoaded = false;
      return newState;
    case types.CATTLE_FAIL:
      newState.saveErrorMessage = action.errorMessage;
      return newState;
    case types.CATTLE_LIST:
      newState.cattleHasLoaded = true;
      newState.cattleList = action.cattleList;
      return newState;
    default:
      return state
  }
}
