"use strict";

import * as types from '../constants/action.types';
import * as Message from '../shared/messages.error';

export default function manageWorkload(state = {
  route: "/list/workload",
  workloads: [],
  hasLoaded: false,
  listWorkloadsErrorMessage: '',
  regionals: [],
  successLoadRegionals: false,
  loadRegionalsErrorMessage: '',
  successSave: false,
  saveWorkloadsErrorMessage: '',
  successDelete: false,
  deleteWorkloadsErrorMessage: '',
  successGenerateFile: false,
  generateFileErrorMessage: '',
  successValidateFile: false,
  validateFileErrorMessage: ''
}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.LIST_WORKLOAD:
      newState.workloads = action.workloads;
      newState.hasLoaded = true;

      return newState;
    case types.LIST_WORKLOAD_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.listWorkloadsErrorMessage = '';
      newState.hasLoaded = false;

      return newState;
    case types.LIST_WORKLOAD_FAIL:
      newState.listWorkloadsErrorMessage = action.errorMessage;

      return newState;
    case types.LOAD_REGIONALS:
      newState.regionals = action.regionals;
      newState.successLoadRegionals = true;

      return newState;
    case types.LOAD_REGIONALS_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.loadRegionalsErrorMessage = '';
      newState.successLoadRegionals = false;

      return newState;
    case types.LOAD_REGIONALS_FAIL:
      newState.loadRegionalsErrorMessage = action.errorMessage;

      return newState;
    case types.LOAD_FUELS:
      newState.fuels = action.fuels;
      newState.successLoadFuels = true;

      return newState;
    case types.LOAD_FUELS_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.loadFuelsErrorMessage = '';
      newState.successLoadFuels = false;

      return newState;
    case types.LOAD_FUELS_FAIL:
      newState.loadFuelsErrorMessage = action.errorMessage;

      return newState;
    case types.LOAD_OILS:
      newState.oils = action.oils;
      newState.successLoadOils = true;

      return newState;
    case types.LOAD_OILS_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.loadOilsErrorMessage = '';
      newState.successLoadOils = false;

      return newState;
    case types.LOAD_OILS_FAIL:
      newState.loadOilsErrorMessage = action.errorMessage;

      return newState;
    case types.LOAD_TANKS:
      newState.tanks = action.tanks;
      newState.successLoadTanks = true;

      return newState;
    case types.LOAD_TANKS_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.loadTanksErrorMessage = '';
      newState.successLoadTanks = false;

      return newState;
    case types.LOAD_TANKS_FAIL:
      newState.loadTanksErrorMessage = action.errorMessage;

      return newState;
    case types.LOAD_PUMPS:
      newState.pumps = action.pumps;
      newState.successLoadPumps = true;

      return newState;
    case types.LOAD_PUMPS_RUNNING:
      // TODO: Show some loading gif while the list isnt ready
      newState.loadPumpsErrorMessage = '';
      newState.successLoadPumps = false;

      return newState;
    case types.LOAD_PUMPS_FAIL:
      newState.loadPumpsErrorMessage = action.errorMessage;

      return newState;
    case types.SAVE_WORKLOAD:
      newState.successSave = true;

      return newState;
    case types.SAVE_WORKLOAD_RUNNING:
      // TODO: Show some loading gif while the save action isnt complete
      newState.successSave = false;
      newState.saveWorkloadsErrorMessage = '';

      return newState;
    case types.SAVE_WORKLOAD_FAIL:
      newState.saveWorkloadsErrorMessage = action.errorMessage;

      return newState;
    case types.DELETE_WORKLOAD:
      newState.successDelete = true;

      return newState;
    case types.DELETE_WORKLOAD_RUNNING:
      // TODO: Show some loading gif while the workload is deleted
      newState.successDelete = false;
      newState.deleteWorkloadsErrorMessage = '';

      return newState;
    case types.DELETE_WORKLOAD_FAIL:
      newState.deleteWorkloadsErrorMessage = action.errorMessage;

      return newState;
    case types.GENERATE_FILE:
      newState.successGenerateFile = true;

      return newState;
    case types.GENERATE_FILE_RUNNING:
      // TODO: Show some loading gif while the file is generated
      newState.successGenerateFile = false;
      newState.generateFileErrorMessage = '';

      return newState;
    case types.GENERATE_FILE_FAIL:
      newState.generateFileErrorMessage = action.errorMessage;

      return newState;
    case types.VALIDATE_FILE:
      newState.successValidateFile = true;

      return newState;
    case types.VALIDATE_FILE_RUNNING:
      // TODO: Show some loading gif while the file is validated
      newState.successValidateFile = false;
      newState.validateFileErrorMessage = '';

      return newState;
    case types.VALIDATE_FILE_FAIL:
      newState.validateFileErrorMessage = action.errorMessage;

      return newState;
    default:
      return state
  }
}

function validateWorkload(workload){
  let hasError = false;
  let errorMessage = [];

  // Required fields
  if(typeof workload.open.date == 'undefined' || workload.open.date.trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Data-hora de abertura'));
  }

  if(typeof workload.open.registration == 'undefined' || workload.open.registration.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Matrícula do bombeiro'));
  }

  if(typeof workload.open.motor_oil == 'undefined' || workload.open.motor_oil.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Óleo de motor de abertura'));
  }

  if(typeof workload.open.pump_position == 'undefined' || workload.open.pump_position.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Posição Registro Bomba de abertura'));
  }

  if(typeof workload.open.stick_mesaure == 'undefined' || workload.open.stick_mesaure.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Medição Vara de abertura'));
  }

  if(typeof workload.close.date == 'undefined' || workload.close.date.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Data-hora de encerramento'));
  }

  if(typeof workload.close.motor_oil == 'undefined' || workload.close.motor_oil.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Óleo de motor de encerramento'));
  }

  if(typeof workload.close.pump_position == 'undefined' || workload.close.pump_position.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Posição Registro Bomba de encerramento'));
  }

  if(typeof workload.close.stick_mesaure == 'undefined' || workload.close.stick_mesaure.toString().trim() == ''){
    hasError = true;
    errorMessage.push(Message.emptyField('Medição Vara de encerramento'));
  }

  // Workload must have at least one refuel
  if(workload.refuel.length == 0){
    hasError = true;
    errorMessage.push(Message.emptyArray("Abastecimento"));
  }

  // Open date and close date must be the same
  let openDate = new Date(workload.open.date);
  let closeDate = new Date(workload.close.date);

  if(openDate.getUTCFullYear() != closeDate.getUTCFullYear() ||
     openDate.getUTCMonth() != closeDate.getUTCMonth() ||
     openDate.getUTCDate() != closeDate.getUTCDate()){
    hasError = true;
    errorMessage.push(Message.datesNotEqual());
  }

  // Open time must be earlier than the close time
  if(openDate >= closeDate){
    hasError = true;
    errorMessage.push(Message.earlierCloseTime());
  }

  return {
    hasError: hasError,
    errorMessage: errorMessage
  };
}
