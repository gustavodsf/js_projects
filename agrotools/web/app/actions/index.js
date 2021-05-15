'use strict';

import axios from 'axios';
import FileDownload from 'react-file-download';
import * as types from '../constants/action.types'
import * as CONSTANTS from '../constants/constants.types';

function loginSuccess(authenticationToken) {
  return {
    type: types.LOGIN,
    authenticationToken: authenticationToken
  }
}

function loginFail(errorMessage) {
  return {
    type: types.LOGIN_FAIL,
    errorMessage: errorMessage
  }
}

function saveCattleSuccess() {
  return {
    type: types.SAVE_CATTLE
  }
}

function saveCattleRunning() {
  return {
    type: types.SAVE_CATTLE_RUNNING
  }
}

function saveProductionRunning() {
  return {
    type: types.SAVE_PRODUCTION_RUNNING
  }
}

function saveProductionSuccess() {
  return {
    type: types.SAVE_PRODUCTION_SUCCESS
  }
}

function productionFail(){
  return {
    type: types.PRODUCTION_FAIL
  }
}

function removeWithSuccess(){
  return {
    type: types.REMOVE_CATTLE
  }
}

function removeCattleRunning(){
  return {
    type: types.REMOVE_CATTLE_RUNNING
  }
}

function removeFail(){
  return {
    type: types.REMOVE_FAIL
  }
}

function removeProductionWithSuccess(){
  return {
    type: types.REMOVE_PRODUCTION_SUCCESS
  }
}

function removeProductionRunning(){
  return {
    type: types.REMOVE_PRODUCTION_RUNNING
  }
}

function removeProductionFail(){
  return {
    type: types.REMOVE_PRODUCTION_FAIL
  }
}

function cattleFail(errorMessage) {
  return {
    type: types.CATTLE_FAIL,
    errorMessage: errorMessage
  }
}

function listCattle(cattleList){
  return {
    type: types.CATTLE_LIST,
    cattleList: cattleList
  }
}

function listCattleRunning(){
  return {
    type: types.CATTLE_LIST_RUNNING
  }
}

function listProduction(productionList){
  return {
    type: types.PRODUCTION_LIST,
    productionList: productionList
  }
}

function listProductionRunning(){
  return {
    type: types.PRODUCTION_LIST_RUNNING
  }
}

export function goToEditCattle(cattle){
  return {
    type: types.GO_TO_EDIT_CATTLE,
    cattle: cattle
  }
}

export function login(name, password){
  return (dispatch) => {
    let url = CONSTANTS.SERVER_ADDRESS + '/users/authenticate';
    let user = {
      name: name,
      password: password
    };

    axios.post(url, user).then((response) => {
      dispatch(loginSuccess(response.data.token));
    }).catch((error) => {
      dispatch(loginFail(error.response.data.message));
    });
  }
}

export function cattleList(token){
  return (dispatch) => {
    dispatch(listCattleRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/cattle/list';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(listCattle(response.data));
    }).catch((error) => {
      dispatch(cattleFail(error.response.data.message));
    });
  }
}

export function productionList(token){
  return (dispatch) => {
    dispatch(listProductionRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/production/list';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(listProduction(response.data));
    }).catch((error) => {
      dispatch(productionFail(error.response.data.message));
    });
  }
}

export function removeCattle(cattle, token){
  return (dispatch) => {
    dispatch(removeCattleRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/cattle/delete/';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url+cattle._id, config).then((response) => {
      dispatch(removeWithSuccess(response));
    }).catch((error) => {
      dispatch(removeFail(error.response.data.message));
    });
  }
}

export function saveCattle (cattle, token){
  return (dispatch) => {
    dispatch(saveCattleRunning());

    let url = CONSTANTS.SERVER_ADDRESS;

    // Check if its an insert ou an update
    if(typeof cattle._id == 'undefined' || cattle._id == ''){
      url += '/cattle/create';
    }
    else{
      url += '/cattle/edit';
    }

    let data = {
      cattle: cattle
    };
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.post(url, data, config).then((response) => {
      dispatch(saveCattleSuccess());
    }).catch((error) => {
      dispatch(cattleFail(error.response.data.message));
    });
  }
}

export function saveProduction (production, token){
  return (dispatch) => {
    dispatch(saveProductionRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/production/create';

    let data = {
      production: production
    };
    let config = {
      headers: {
        "x-access-token": token
      }
    };
    axios.post(url, data, config).then((response) => {
      console.log('Passei!');
      dispatch(saveProductionSuccess());
    }).catch((error) => {
      console.log(error);
      dispatch(productionFail(error.response.data));
    });
  }
}

export function removeProduction(production, token){
  return (dispatch) => {
    dispatch(removeProductionRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/production/delete/';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url+production._id, config).then((response) => {
      dispatch(removeProductionWithSuccess(response));
    }).catch((error) => {
      dispatch(removeProductionFail(error.response.data.message));
    });
  }
}
