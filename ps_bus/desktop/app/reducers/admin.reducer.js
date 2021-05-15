import { ADD_ADMIN }                      from '../constants/action.types';
import { CHANGE_PASSWORD }                from '../constants/action.types';
import { CLEAN_ADMIN_JOB_IS_DONE }        from '../constants/action.types';
import { LOGAR_ADMIN }                    from '../constants/action.types';
import { SAVE_CONFIGURATION }             from '../constants/action.types';
import { VALIDATE_PASSWORD }              from '../constants/action.types';
import * as msg                           from '../shared/msg.types';

const ipc = require('electron').ipcRenderer;

export default function admin(state = {passwordMatch: "", error: 1}, action) {
  switch (action.type) {
    case LOGAR_ADMIN:
      let newStateLogin = Object.assign({}, state);
      _login(newStateLogin,action);
      return newStateLogin;
    case SAVE_CONFIGURATION:
      let newStateConfiguration = Object.assign({}, state);
      _saveConfiguration(newStateConfiguration, action);
      return newStateConfiguration;
    case VALIDATE_PASSWORD:
      let newStatePassword = Object.assign({}, state);
      _validateSimilarPassword(newStatePassword,action);
      return newStatePassword;
    case CHANGE_PASSWORD:
      let newStateChangePassword = Object.assign({}, state);
      _changePassword(newStateChangePassword,action);
      return newStateChangePassword;
    case CLEAN_ADMIN_JOB_IS_DONE:
      let newStateJobIsDone = Object.assign({}, state);    
      _cleanState(newStateJobIsDone);
      return newStateJobIsDone;
    default:
      return state; 
  }
}

//function to change the password use to enter on the configuration
function _changePassword(newState, action){
  let erro = false;
  erro = _validaPassword(newState,action);
  erro = _validateSimilarPassword(newState,action);
  if(!erro){
    ipc.sendSync('SYNCHRONOUS_CHANGE_PASSWORD', action.admin.password) ;
    newState.error = 0;
  }else{
    newState.error += 1;
  }
}

// enter on the adminstration area of the totem
function _login(newState, action){
  if(!_validaPassword(newState,action) && !_validaPasswordDB(newState,action)){
    newState.error = 0;
  }else{
    newState.error += 1;
  }
}

//save the new configuration, used to inform where the totem is
function _saveConfiguration(newState, action){
  const ok = ipc.sendSync('SYNCHRONOUS_SAVE_CONFIGURATION', action.admin) ;
  if(ok){
    newState.error = 0;
  }else{
    newState.error += 1;
  }
}

//check if the password and confirmation is equal
function _validateSimilarPassword(newState, action){
  if(action.admin.password ==  action.admin.confirmation){
    newState.passwordMatch = ""
    return false;
  }else{
    newState.passwordMatch = msg.PASSWORD_DONT_MATCH;
    return true;
  }
}

//validate if the password is in the pattern accept
function _validaPassword(newState, action){
  let erro = false;
  if(action.admin.password.trim() == ""){
    erro = true;
  }

  if(!action.admin.password.match(/^\d+$/)){
     erro = true;
  }

  if(action.admin.password.length < 4 || action.admin.password.length > 8){
    erro = true;
  }
  return erro;
}

//check if the password is equal to the  password on the database
function _validaPasswordDB(newState, action){
  let erro = false;
  const ok = ipc.sendSync('SYNCHRONOUS_SIGIN', action.admin.password) ;
  if(!ok){
    erro = true;
  }
  return erro;
}

// clean the state 
function _cleanState(newState){
  newState.error = 1;
  newState.passwordMatch = "";
}
