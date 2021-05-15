import { CLEAN_OIL_JOB_IS_DONE }           from '../constants/action.types';
import { isNumberMoreThanZero }            from '../shared/validator';
import { SAVE_OIL_REPOSITION }             from '../constants/action.types';
import { VALIDATE_OIL_BUS_NUMBER }         from '../constants/action.types';
import * as msg                            from '../shared/msg.types';

const ipc = require('electron').ipcRenderer;

export default function motorOil(state = {busNumber_error: "", bus_data: "", oil_error: "", error: 1}, action) {
  switch (action.type) {
    case VALIDATE_OIL_BUS_NUMBER:
      let newStateValidateBusNumber = Object.assign({}, state)
      _validaBusNumber(newStateValidateBusNumber,action)
      return newStateValidateBusNumber;
    case SAVE_OIL_REPOSITION:
      let newState = Object.assign({}, state)
      _saveOilRepostition(newState,action)
      return newState
    case CLEAN_OIL_JOB_IS_DONE:
      let newStateJobIsDone = Object.assign({}, state);
      _cleanState(newStateJobIsDone);
      return newStateJobIsDone;
    default:
      return state;
  }
}

function _saveOilRepostition(newState,action){
  let erro = _validaOilReposition(newState,action)
  if(!erro){
    let oil = {
      amount:     action.motorOil.oil,
      busNumber:  action.motorOil.busNumber,
      idWorkload: newState.idWorkload
    };
    const saved = ipc.sendSync('SYNCHRONOUS_SAVE_OIL', oil) ;
    if(saved){
      newState.error = 0;
    }else{
      newState.error +=1;
    }
  }else{
    newState.error +=1;
  }
}

function _validaOilReposition(newState, action){
   let erro = false;
   if( !isNumberMoreThanZero(action.motorOil.oil) ){
      erro = true;
      newState.oil_error =  msg.AMOUNT_OF_OIL_ERROR;
    }
    else{
      newState.oil_error =  "";
    }
    if(_validaBusNumber(newState, action)){
      erro = true;
    }
    return erro;

}

function _validaBusNumber(newState, action){
  let erro  = false;
  const bus = ipc.sendSync('SYNCHRONOUS_VALIDATE_BUS_NUMBER', action.motorOil.busNumber) ;
  if(bus != ""){
    newState.bus_data = msg.CAR_PLATE+bus["car_plate"];
    newState.busNumber_error =  ""
  }else{
    erro  = true;
    newState.busNumber_error = msg.BUS_NUMBER_ERROR;
    newState.bus_data = ""
  }
  return erro;
}

function _cleanState(newState){
  newState.error = 1;
  newState.busNumber_error = "";
  newState.bus_data = "";
  newState.bus_driver = "";
  newState.oil_error = "";
}