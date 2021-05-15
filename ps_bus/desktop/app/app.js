"use strict";
//IMPORT DE BIBILIOTECAS
import { applyMiddleware }     from 'redux';
import { createStore }         from 'redux';
import { createMemoryHistory } from "react-router";
import { IndexRoute  }         from 'react-router';
import { observableFromStore } from 'redux-rx';
import { Provider }            from 'react-redux';
import React                   from 'react';
import { Router }              from 'react-router';
import { render }              from 'react-dom';
import { Route  }              from 'react-router';
import ReduxToastr             from 'react-redux-toastr';
import thunkMiddleware                                      from 'redux-thunk';

//IMPORT DE CODIGO PROPRIO
import AdminRegional       from './components/admin.regional.component';
import AdminSenha          from './components/admin.senha.component';
import { cleanRouter }     from './actions/index'
import CloseWorkload       from './components/close.workload.component';
import Fuelling            from './components/fuelling.component';
import Login               from './components/login.component';
import Menu                from './components/menu.component';
import MotorOil            from './components/motor.oil.component'
import OpenWorkload        from './components/open.workload.component';
import reducer             from './reducers';
import Totem               from './containers/totem.container';

//VARIAVEIS CONSTANTES
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const memoryHistory = createMemoryHistory("/");

const routes = (
  <Route path="/" component={Totem}>
    <Route path="/admin/regional" component={AdminRegional}/>
    <Route path="/admin/senha" component={AdminSenha}/>
    <Route path="/close/workload" component={CloseWorkload}/>
    <Route path="/fuelling" component={Fuelling}/>
    <Route path="/login" component={Login}/>
    <IndexRoute component={Menu}/>
    <Route path="/motor/oil" component={MotorOil}/>
    <Route path="/open/workload" component={OpenWorkload}/>
  </Route>
);  

render(
  <Provider store={store}>
    <Router history={memoryHistory} routes={routes} />
  </Provider>,
  document.getElementById('totem')
)

const state$ = observableFromStore(store);

const didFuelling$ = state$.distinctUntilChanged(state => state.router.route == "/fuelling").filter(state => state.router.route == "/fuelling");
didFuelling$.subscribe((state) =>{
  memoryHistory.push("/fuelling")
  store.getState().fuelling.idWorkload = state.openWorkload.idWorkload;
  store.getState().motorOil.idWorkload = state.openWorkload.idWorkload;
  store.getState().close.idWorkload = state.openWorkload.idWorkload;
  store.dispatch(cleanRouter())
});

const didOpenWorkload$ = state$.distinctUntilChanged(state => state.router.route === "/open/workload").filter(state => state.router.route === "/open/workload");
didOpenWorkload$.subscribe((state) =>{  
  memoryHistory.push("/open/workload")
  store.dispatch(cleanRouter())
});

const didConfigureAdmin$ = state$.distinctUntilChanged(state => state.router.route === "/admin/regional").filter(state => state.router.route === "/admin/regional");
didConfigureAdmin$.subscribe((state) =>{  
  memoryHistory.push("/admin/regional")
  store.dispatch(cleanRouter())
});

