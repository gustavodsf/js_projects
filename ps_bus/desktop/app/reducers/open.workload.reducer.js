import { CLEAN_OPEN_WORKLOAD_JOB_IS_DONE }   from '../constants/action.types';
import { isNumberMoreThanZero }              from '../shared/validator';
import { OPEN_WORKLOAD }                     from '../constants/action.types';
import { VALIDATE_REGISTRATION }             from '../constants/action.types';
import * as msg                              from '../shared/msg.types';

const ipc    = require('electron').ipcRenderer;

export default function openWorkload(state = {motorOil_error: "", pumpPosition_error: "" , 
                                              stickMesaure_error: "", registration_error: "",
                                              error: 1}, action) {

  switch (action.type) {
    // Change the state and if everthing is all right save the workload on database
    case OPEN_WORKLOAD:
      let newState = Object.assign({}, state);
      _openWorkload(newState,action);
      return newState;

    // Change the original state to one that the registration os validated
    case VALIDATE_REGISTRATION:
      let newStateValidateRegistration = Object.assign({}, state);
      _validaRegistration(newStateValidateRegistration,action);
      return newStateValidateRegistration;

    case CLEAN_OPEN_WORKLOAD_JOB_IS_DONE:
      let newStateCleanWorkload = Object.assign({}, state);
      _cleanState(newStateCleanWorkload);
      return newStateCleanWorkload;

    default:
      return state;
  }
}

function _openWorkload(newState, action){
  let erro = _validaWorkload(newState,action)
  if(!erro){
    let workload = {};
    workload["open"] = {};
    workload["open"]["pumpPosition"] = action.workload.pumpPosition;
    workload["open"]["motorOil"]     = action.workload.motorOil;
    workload["open"]["stickMesaure"] = action.workload.stickMesaure;
    workload["open"]["registration"] = action.workload.registration;
    const idWorkload = ipc.sendSync('SYNCHRONOUS_SAVE_WORKLOAD', workload) ;
    newState.pump_worker = "";
    newState.idWorkload = idWorkload;
    newState.error = 0;
  }else{
    newState.error +=1;
  }
}

function _validaWorkload(newState, action){
   let erro = false;
   //Check if the pump position is a number more than zero
   if( !isNumberMoreThanZero(action.workload.pumpPosition) ){
      erro = true;
      newState.pumpPosition_error =  msg.OPEN_PUMP_POSITION_ERROR;
    }
    else{
      newState.pumpPosition_error =  "";
    }

    //Check if the motor oil is a number more than zero
    if( !isNumberMoreThanZero(action.workload.motorOil) ){
      erro = true;
      newState.motorOil_error =  msg.OPEN_MOTOR_OIL_POSITION_ERROR
    }
    else{
      newState.motorOil_error =  "";
    }

    //Check if the stick mesaure is a number more than zero
    if(  !isNumberMoreThanZero(action.workload.stickMesaure)){
      erro = true;
      newState.stickMesaure_error =  msg.STICK_MEASURE_ERROR;
    }
    else{
      newState.stickMesaure_error =  "";
    }

    //Check if the registration of the pump worker is valid.
    if(_validaRegistration(newState,action)){
      erro = true;
    }
    return erro;
}

function _validaRegistration(newState, action){
  let erro  = false;

  //Send a message to electron to use mongo to check if the registration number exist on database
  const worker = ipc.sendSync('SYNCHRONOUS_VALIDATE_REGISTRATION', action.workload.registration) ;
  if(worker != ""){
    // Put the name of the pump worker on the state
    newState.pump_worker =  msg.PUMP_MAN+worker["full_name"];
    // Remove from the state the message of error
    newState.registration_error =  ""
  }else{
    erro  = true;
    // Put the message of error ont the sate
    newState.registration_error = msg.REGISTRATION_ERROR
    // Remove the name of the worker 
    newState.pump_worker = ""
  }
  return erro;
}

function _cleanState(newState){
  newState.error = 1;
  newState.pumpPosition_error =  "";
  newState.motorOil_error =  "";
  newState.stickMesaure_error =  "";
  newState.pump_worker =  "";
  newState.registration_error =  "";
}