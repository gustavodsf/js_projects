"use strict";

import * as types from '../constants/action.types';
import * as Message from '../shared/messages.error';

export default function production(state = {},action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.SAVE_PRODUCTION_SUCCESS:
      newState.successSave = true;
      return newState;
    case types.SAVE_PRODUCTION_RUNNING:
      // TODO: Show some loading gif while the save action isnt complete
      newState.successSave = false;
      newState.saveErrorMessage = '';
      return newState;
    case types.PRODUCTIO_FAIL:
      newState.saveErrorMessage = action.errorMessage;
      return newState;
    default:
      return state
  }
}
