"use strict";

import { combineReducers } from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import workloadList         from './workload.list.reducer'
import login                from './login.reducer'
import sendFile             from './send.file.reducer'

const rootReducer = combineReducers({
   workloadList: workloadList,
   login: login,
   send_file: sendFile,
   toastr: toastrReducer
})
export default rootReducer
