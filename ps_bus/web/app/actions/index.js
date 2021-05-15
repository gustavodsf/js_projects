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

function listWorkloadSuccess(workloads) {
  return {
    type: types.LIST_WORKLOAD,
    workloads: workloads
  }
}

function listWorkloadRunning() {
  return {
    type: types.LIST_WORKLOAD_RUNNING
  }
}

function listWorkloadFail(errorMessage) {
  return {
    type: types.LIST_WORKLOAD_FAIL,
    errorMessage: errorMessage
  }
}

function loadRegionalsSuccess(regionals) {
  return {
    type: types.LOAD_REGIONALS,
    regionals: regionals
  }
}

function loadRegionalsRunning() {
  return {
    type: types.LOAD_REGIONALS_RUNNING
  }
}

function loadRegionalsFail(errorMessage) {
  return {
    type: types.LOAD_REGIONALS_FAIL,
    errorMessage: errorMessage
  }
}

function loadFuelsSuccess(fuels) {
  return {
    type: types.LOAD_FUELS,
    fuels: fuels
  }
}

function loadFuelsRunning() {
  return {
    type: types.LOAD_FUELS_RUNNING
  }
}

function loadFuelsFail(errorMessage) {
  return {
    type: types.LOAD_FUELS_FAIL,
    errorMessage: errorMessage
  }
}

function loadOilsSuccess(oils) {
  return {
    type: types.LOAD_OILS,
    oils: oils
  }
}

function loadOilsRunning() {
  return {
    type: types.LOAD_OILS_RUNNING
  }
}

function loadOilsFail(errorMessage) {
  return {
    type: types.LOAD_OILS_FAIL,
    errorMessage: errorMessage
  }
}

function loadTanksSuccess(tanks) {
  return {
    type: types.LOAD_TANKS,
    tanks: tanks
  }
}

function loadTanksRunning() {
  return {
    type: types.LOAD_TANKS_RUNNING
  }
}

function loadTanksFail(errorMessage) {
  return {
    type: types.LOAD_TANKS_FAIL,
    errorMessage: errorMessage
  }
}

function loadPumpsSuccess(pumps) {
  return {
    type: types.LOAD_PUMPS,
    pumps: pumps
  }
}

function loadPumpsRunning() {
  return {
    type: types.LOAD_PUMPS_RUNNING
  }
}

function loadPumpsFail(errorMessage) {
  return {
    type: types.LOAD_PUMPS_FAIL,
    errorMessage: errorMessage
  }
}

function saveWorkloadSuccess() {
  return {
    type: types.SAVE_WORKLOAD
  }
}

function saveWorkloadRunning() {
  return {
    type: types.SAVE_WORKLOAD_RUNNING
  }
}

function saveWorkloadFail(errorMessage) {
  return {
    type: types.SAVE_WORKLOAD_FAIL,
    errorMessage: errorMessage
  }
}

function deleteWorkloadSuccess() {
  return {
    type: types.DELETE_WORKLOAD
  }
}

function deleteWorkloadRunning() {
  return {
    type: types.DELETE_WORKLOAD_RUNNING
  }
}

function deleteWorkloadFail(errorMessage) {
  return {
    type: types.DELETE_WORKLOAD_FAIL,
    errorMessage: errorMessage
  }
}

function generateFileSuccess() {
  return {
    type: types.GENERATE_FILE
  }
}

function generateFileRunning() {
  return {
    type: types.GENERATE_FILE_RUNNING
  }
}

function generateFileFail(errorMessage) {
  return {
    type: types.GENERATE_FILE_FAIL,
    errorMessage: errorMessage
  }
}

function validateFileSuccess() {
  return {
    type: types.VALIDATE_FILE
  }
}

function validateFileRunning() {
  return {
    type: types.VALIDATE_FILE_RUNNING
  }
}

function validateFileFail(errorMessage) {
  return {
    type: types.VALIDATE_FILE_FAIL,
    errorMessage: errorMessage
  }
}

export const sendFileFuncionario = (file) => {
  return {
    type: types.SEND_FILE_FUNCIONARO,
    file: file
  }
}

export const sendFileFrota = (file) => {
  return {
    type: types.SEND_FILE_FROTA,
    file: file
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

export function listWorkload (token){
  return (dispatch) => {
    dispatch(listWorkloadRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/workloads/list/false';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(listWorkloadSuccess(response.data));
    }).catch((error) => {
      dispatch(listWorkloadFail(error.response.data.message));
    });
  }
}

export function loadRegionals (token){
  return (dispatch) => {
    dispatch(loadRegionalsRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/model/garage';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(loadRegionalsSuccess(response.data));
    }).catch((error) => {
      dispatch(loadRegionalsFail(error.response.data.message));
    });
  }
}

export function loadFuels (token){
  return (dispatch) => {
    dispatch(loadFuelsRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/model/fuel';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(loadFuelsSuccess(response.data));
    }).catch((error) => {
      dispatch(loadFuelsFail(error.response.data.message));
    });
  }
}

export function loadOils (token){
  return (dispatch) => {
    dispatch(loadOilsRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/model/oil';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(loadOilsSuccess(response.data));
    }).catch((error) => {
      dispatch(loadOilsFail(error.response.data.message));
    });
  }
}

export function loadTanks (token){
  return (dispatch) => {
    dispatch(loadTanksRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/model/tank';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(loadTanksSuccess(response.data));
    }).catch((error) => {
      dispatch(loadTanksFail(error.response.data.message));
    });
  }
}

export function loadPumps (token){
  return (dispatch) => {
    dispatch(loadPumpsRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/model/pump';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url, config).then((response) => {
      dispatch(loadPumpsSuccess(response.data));
    }).catch((error) => {
      dispatch(loadPumpsFail(error.response.data.message));
    });
  }
}

export function saveWorkload (workload, token){
  return (dispatch) => {
    dispatch(saveWorkloadRunning());

    let url = CONSTANTS.SERVER_ADDRESS;

    // Check if its an insert ou an update
    if(typeof workload._id == 'undefined' || workload._id == ''){
      url += '/workloads/create';
    }
    else{
      url += '/workloads/update';
    }

    let data = workload;
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.post(url, data, config).then((response) => {
      dispatch(saveWorkloadSuccess());
    }).catch((error) => {
      dispatch(saveWorkloadFail(error.response.data.message));
    });
  }
}

export function deleteWorkload(workloadId, token){
  return (dispatch) => {
    dispatch(deleteWorkloadRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/workloads/delete/' + workloadId;
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.delete(url,config).then((response) => {
      dispatch(deleteWorkloadSuccess());
    }).catch((error) => {
      dispatch(deleteWorkloadFail(error.response.data.message));
    });
  }
}

export function generateFile(token){
  return (dispatch) => {
    dispatch(generateFileRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/workloads/generate/file';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url,config).then((response) => {
      dispatch(generateFileSuccess());
      FileDownload(response.data, 'abastecimentos_'+ new Date().toISOString() + '.txt');
    }).catch((error) => {
      dispatch(generateFileFail(error.response.data.message));
    });
  }
}

export function validateFile(token){
  return (dispatch) => {
    dispatch(validateFileRunning());

    let url = CONSTANTS.SERVER_ADDRESS + '/workloads/file/is/ok';
    let config = {
      headers: {
        "x-access-token": token
      }
    };

    axios.get(url,config).then((response) => {
      dispatch(validateFileSuccess());
    }).catch((error) => {
      dispatch(validateFileFail(error.response.data.message));
    });
  }
}
