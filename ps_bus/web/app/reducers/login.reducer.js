"use strict";

import * as types from '../constants/action.types';

export default function login(state = {route: '/', authenticationToken: '', authenticationError: ''}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.LOGIN:
      newState.authenticationToken = action.authenticationToken;
      newState.route = '/workload/list';

      return newState;
    case types.LOGIN_FAIL:
      newState.authenticationError = {
        hasError: true,
        message: action.errorMessage
      };

      return newState;
    default:
      return state;
  }
}
