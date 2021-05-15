"use strict";
import axios from 'axios';
import { SEND_FILE_FUNCIONARO } from '../constants/action.types';
import { SEND_FILE_FROTA } from '../constants/action.types';
import { SERVER_ADDRESS } from '../constants/constants.types';

export default function sendFile(state = {error: 1}, action) {
  switch (action.type) {
    case SEND_FILE_FUNCIONARO:
      let newStateFileFuncionario = Object.assign({}, state);
      let jsonFuncionarioArray = _createFuncionarioJson(action,newStateFileFuncionario)
      console.log(newStateFileFuncionario);
      _sendFuncionarioJson(newStateFileFuncionario,jsonFuncionarioArray);
      return newStateFileFuncionario;
    case SEND_FILE_FROTA:
      let newStateFileFrota = Object.assign({}, state);
      console.log(newStateFileFrota);
      let jsonFrotaArray = _createFrotaJson(action,newStateFileFrota)
      _sendFrotaJson(newStateFileFrota,jsonFrotaArray);
      return newStateFileFrota;
    default:
      return state;
  }
}

function _createFuncionarioJson(action,state){
  let arrayFile = action.file.split("\n");
  let jsonArray = []
  for( let i = 0; i < arrayFile.length; i++){
    arrayFile[i] = arrayFile[i].replace(/"/g, '');
    if( arrayFile[i] != "") {
      let func = arrayFile[i].split(",");
      let registration = "#"+func[0];
      registration = registration.replace("#00","");
      registration = registration.replace("#","");

      let json = {"registration": registration, "full_name": func[1] , "admission_date": func[2]}
      jsonArray.push(json)
    }
  }
  state.error = state.error + 1;
  return jsonArray;
}

function _createFrotaJson(action,state){
  let arrayFile = action.file.split("\n");
  let jsonArray = []
  for( let i = 0; i < arrayFile.length; i++){
      arrayFile[i] = arrayFile[i].replace(/"/g, '');
      if( arrayFile[i] != "") {
        let func = arrayFile[i].split(",");
        let busNumber = "#"+func[2];
        busNumber = busNumber.replace("#00","");
        busNumber = busNumber.replace("#","");

        let json = {"car_plate": func[0], "tank_capacity": func[1] , "bus_number": busNumber,
                    "car_model": func[3], "car_brand": func[4], "chassis_model": func[5],"chassis_brand": func[6] }
        jsonArray.push(json)
      }
  }
  state.error = state.error + 1;
  return jsonArray;
}

function _sendFuncionarioJson(newState,jsonArray){
  axios.post(SERVER_ADDRESS + '/model/load/funcionario', {
    token: newState.authenticationToken,
    json_array: jsonArray
  })
  .then(function (response) {})
  .catch(function (error) {});

}

function _sendFrotaJson(newState,jsonArray){
  axios.post(SERVER_ADDRESS+'/model/load/frota', {
    token: newState.authenticationToken,
    json_array: jsonArray
  })
  .then(function (response) {console.log(response)})
  .catch(function (error)   {console.log(response)});
}
