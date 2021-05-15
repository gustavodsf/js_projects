import { CLEAN_CLOSE_WORKLOAD_JOB_IS_DONE } from '../constants/action.types';
import { CLOSE_WORKLOAD }                   from '../constants/action.types';
import { isNumberMoreThanZero }             from '../shared/validator';
import * as msg                             from '../shared/msg.types';

const ipc = require('electron').ipcRenderer;

export default function closeWorkload(state = {motorOil_error: "", pumpPosition_error: "" , stickMesaure_error: "", error: 1}, action) {
  switch (action.type) {
    case CLOSE_WORKLOAD:
      let newState = Object.assign({}, state)
      _saveCloseWorkload(newState,action);
      return newState
    case CLEAN_CLOSE_WORKLOAD_JOB_IS_DONE:
      let newStateJobIsDone = Object.assign({}, state);
      _cleanState(newStateJobIsDone);
      return newStateJobIsDone;
    default:
      return state;
  }
}

function _saveCloseWorkload(newState, action){
  if(!_validateAllFields(newState,action)){
    action.closeWorkload.idWorkload = newState.idWorkload;
    const saved = ipc.sendSync('SYNCHRONOUS_END_WORKDAY', action.closeWorkload) ;
    if(saved){
      newState.error = 0;
    }else{
      newState.error +=1;
    }
  }else{
    newState.error +=1;
  }
}

function _validateAllFields(newState, action){
  let erro = false;
  if(!isNumberMoreThanZero(action.closeWorkload.motorOil) ){
    newState.motorOil_error = msg.CLOSE_MOTOR_OIL_POSITION_ERROR;
    erro = true;
  }else{
    newState.motorOil_error = ""
  }

  if(!isNumberMoreThanZero(action.closeWorkload.pumpPosition) ){
    newState.pumpPosition_error = msg.CLOSE_PUMP_POSITION_ERROR;
    erro = true;
  }else{
    newState.pumpPosition_error = ""
  }

  if(!isNumberMoreThanZero(action.closeWorkload.stickMesaure) ){
    newState.stickMesaure_error = msg.STICK_MEASURE_ERROR;
    erro = true;
  }else{
    newState.stickMesaure_error = ""
  }
  return erro;
}

function _cleanState(newState){
  newState.error = 1;
  newState.motorOil_error = "";
  newState.pumpPosition_error = ""
  newState.stickMesaure_error = ""
}