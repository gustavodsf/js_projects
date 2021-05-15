import { ADD_OPEN_DAY }                      from '../constants/action.types';
import { CLEAN_REFUEL_JOB_IS_DONE }          from '../constants/action.types';
import { isNumberMoreThanZero }              from '../shared/validator';
import { SAVE_REFUEL }                       from '../constants/action.types';
import { VALIDATE_AMOUNT_FUEL }              from '../constants/action.types';
import { VALIDATE_BUS_DRIVER }               from '../constants/action.types';
import { VALIDATE_BUS_NUMBER }               from '../constants/action.types';
import { VALIDATE_ODOMETER }                 from '../constants/action.types';
import * as msg                              from '../shared/msg.types';

const ipc = require('electron').ipcRenderer;

export default function fuelling(state = {error: 1}, action) {
  switch (action.type) {
    case VALIDATE_BUS_DRIVER:
      let newStateValidateRegistration = Object.assign({}, state);
      _validaRegistration(newStateValidateRegistration,action);
      return newStateValidateRegistration;
    case VALIDATE_BUS_NUMBER:
      let newStateValidateBusNumber = Object.assign({}, state);
      _validaBusNumber(newStateValidateBusNumber,action);
      return newStateValidateBusNumber;
    case VALIDATE_ODOMETER:
      let newStateValidateOdometer = Object.assign({}, state);
      _validaOdometer(newStateValidateOdometer,action);
      return newStateValidateOdometer;
    case VALIDATE_AMOUNT_FUEL:
      let newStateValidateAmountFuel = Object.assign({}, state);
      _validaAmountFuel(newStateValidateAmountFuel,action);
      return newStateValidateAmountFuel;
    case SAVE_REFUEL:
      let newStateSaveRefuel = Object.assign({}, state);
      _saveRefuel(newStateSaveRefuel,action);
      return newStateSaveRefuel;
    case CLEAN_REFUEL_JOB_IS_DONE:
      let newStateJobIsDone = Object.assign({}, state);
      _cleanState(newStateJobIsDone);
      return newStateJobIsDone;
    default:
      return state;
  }
}

function _saveRefuel(newState, action){
  if(!_validateAllFields(newState,action)){
    let data = action.fuelling;
    data.idWorkload = newState.idWorkload;
    const saved = ipc.sendSync('SYNCHRONOUS_SAVE_REFUEL', data) ;
    if(saved){
      newState.error = 0;
    }else{
      newState.error += 1;
    }
  }else{
    newState.error += 1;
  }
}

function _validateAllFields(newState, action){
  let erro = false;
  if(_validaRegistration(newState, action)){
    erro = true;
  }
  if(_validaBusNumber(newState, action)){
    erro = true;
  }
  if(_validaAmountFuel(newState, action)){
    erro = true;
  }
  if(_validaOdometer(newState, action)){
    erro = true;
  }
  return erro;
}

function _validaRegistration(newState, action){
  let erro  = false;
  const worker = ipc.sendSync('SYNCHRONOUS_VALIDATE_REGISTRATION', action.fuelling.registration);
  if(worker != ""){
    newState.bus_driver =  msg.DRIVER+worker["full_name"];
    newState.registration_error =  "";
  }else{
    erro  = true;
    newState.registration_error = msg.REGISTRATION_ERROR;
    newState.bus_driver = "";
  }
  return erro;
}

function _validaBusNumber(newState, action){
  let erro  = false;
  const bus = ipc.sendSync('SYNCHRONOUS_VALIDATE_BUS_NUMBER', action.fuelling.busNumber) ;
  if(bus != ""){
    newState.bus_data = msg.CAR_PLATE+bus["car_plate"];
    newState.busNumber_error =  "";
  }else{
    erro  = true;
    newState.busNumber_error = msg.BUS_NUMBER_ERROR;
    newState.bus_data = "";
  }
  return erro;
}
//isNumberMoreThanZero
function _validaAmountFuel(newState, action){

  if(action.fuelling.amountFuel == "" || action.fuelling.amountFuel.includes('_')){
    newState.fuel_error = msg.AMOUNT_OF_FUEL_ERROR;
    return true;
  }else{
    const result = ipc.sendSync('SYNCHRONOUS_VALIDATE_FUEL', action.fuelling);
    if(parseFloat(result['tank_capacity']) >= parseFloat(action.fuelling.amountFuel) ){
       newState.fuel_error = "";
       return false;
    }else{
      newState.fuel_error = msg.MORE_FUEL_THAN_TANK_CAPACITY;
      return true;
    }
  }
}

function _validaOdometer(newState, action){
  const result = ipc.sendSync('SYNCHRONOUS_VALIDATE_ODOMETER', action.fuelling);
  if(parseFloat(result['odometer']) < parseFloat(action.fuelling.odometer) ){
    if( parseFloat(result['odometer']) == 0
        || parseFloat(action.fuelling.odometer) - parseFloat(result['odometer']) <= 1200){
      newState.odometer_error = "";
      return false;
    }else{
      newState.odometer_error = msg.ODOMETER_ERROR_ABOVE_LIMIT;
      return true;
    }
  }else{
    newState.odometer_error = msg.ODOMETER_ERROR_LESS_THAN_OLDER;
    return true;
  }
}

function _cleanState(newState){
  newState.error             = 1;
  newState.busNumber_error   = "";
  newState.bus_data          = "";
  newState.bus_driver        = "";
  newState.fuel_error        = "";
  newState.fuel_error        = "";
  newState.odometer_error    = "";
  newState.registration_error= "";
}
