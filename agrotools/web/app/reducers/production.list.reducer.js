"use strict";

import * as types from '../constants/action.types';
import * as Message from '../shared/messages.error';

export default function productionList(state = {},action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
      case types.PRODUCTION_LIST_RUNNING:
        newState.saveErrorMessage = '';
        newState.productionHasLoaded = false;
        return newState;
      case types.PRODUCTION_LIST:
        newState.productionHasLoaded = true;
        newState.productionList = action.productionList;
        return newState;
      case types.REMOVE_PRODUCTION_SUCCESS:
        newState.removeSuccess = true;
        return newState;
      case types.REMOVE_PRODUCTION_RUNNING:
        newState.removeSuccess = false;
        return newState;
      case types.REMOVE_PRODUCTION_FAIL:
        newState.removeSuccess = false;
        return newState;
      default:
        return state
  }
}
