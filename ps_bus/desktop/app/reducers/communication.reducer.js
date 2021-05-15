import { SEND_WORKLOAD_SERVER } from '../constants/action.types';
import { UPDATE_EMPLOYEE } from '../constants/action.types';
import { UPDATE_FEET } from '../constants/action.types';
const ipc = require('electron').ipcRenderer;

export default function communication(state = {}, action) {
    switch (action.type) {
        case SEND_WORKLOAD_SERVER:
            let newState = Object.assign({}, state);
            _sendWorkload();
            return newState;
        case UPDATE_FEET:
            let newStateFleet = Object.assign({}, state);
            _updateFleet();
            return newStateFleet;
        case UPDATE_EMPLOYEE:
            let newStateEmployee = Object.assign({}, state);
            _updateEmployee();
            return newStateEmployee;
        default:
            return state; 
    }
}

function _sendWorkload(){
    const token = ipc.sendSync('GET_AUTHENTICATION_TOKEN') ;
    const workloads = ipc.sendSync('SEND_WORKLOAD_NOT_SENEDED',token);
}

function _updateFleet(){
    const token = ipc.sendSync('GET_AUTHENTICATION_TOKEN') ;
    const fleet = ipc.sendSync('UPDATE_FLEET',token);
}

function _updateEmployee(){
    const token = ipc.sendSync('GET_AUTHENTICATION_TOKEN') ;
    const employee = ipc.sendSync('UPDATE_EMPLOYEE',token);
}