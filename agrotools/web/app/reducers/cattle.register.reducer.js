"use strict";

import * as types from '../constants/action.types';
import * as Message from '../shared/messages.error';

export default function manageWorkload(state = {
  route: '/cattle/register',
  successSave: false,
  saveErrorMessage: ''
}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.SAVE_CATTLE:
      newState.successSave = true;
      return newState;
    case types.SAVE_CATTLE_RUNNING:
      // TODO: Show some loading gif while the save action isnt complete
      newState.successSave = false;
      newState.saveErrorMessage = '';
      return newState;
    default:
      return state
  }
}
