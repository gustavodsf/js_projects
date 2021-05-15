"use strict";

import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import login                from './login.reducer';
import cattleRegister       from './cattle.register.reducer';
import cattleList           from './cattle.list.reducer';
import production           from './production.reducer';
import productionList       from './production.list.reducer';

const rootReducer = combineReducers({
   login: login,
   cattleRegister: cattleRegister,
   cattleList: cattleList,
   toastr: toastrReducer,
   production: production,
   productionList: productionList
});
export default rootReducer;
