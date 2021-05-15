"use strict";

import { compose, createStore, applyMiddleware }            from 'redux';
import { IndexRoute, Route, Router, createMemoryHistory }   from 'react-router';
import { render }                                           from 'react-dom';
import { Provider }                                         from 'react-redux';
import { observableFromStore }                              from 'redux-rx';
import thunkMiddleware                                      from 'redux-thunk';
import ReduxToastr                                          from 'react-redux-toastr';
import React                                                from 'react';

import Login                                                from './components/login.component';
import Principal                                            from './components/principal.component';
import CattleRegister                                       from './components/cattle.register.component';
import CattleList                                           from './components/cattle.list.component';
import ProductionRegister                                   from './components/production.register.component';
import ProductionList                                       from './components/production.list.component';
import reducer                                              from './reducers';
import Web                                                  from './containers/web.container';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware)
  )
);
const memoryHistory = createMemoryHistory("/");

const routes = (
  <Route path="/" component={Web}>
    <IndexRoute component={Login}></IndexRoute>
    <Route path="/principal" component={Principal}></Route>
    <Route path="/cattle/register" component={CattleRegister}></Route>
    <Route path="/cattle/register/:cattleId" component={CattleRegister}></Route>
    <Route path="/cattle/list" component={CattleList}></Route>
    <Route path="/production/register" component={ProductionRegister}></Route>
    <Route path="/production/list" component={ProductionList}></Route>
  </Route>
);

render(
  <Provider store={store}>
    <Router history={memoryHistory} routes={routes} />
  </Provider>,
  document.getElementById('totem-web')
);

const state$ = observableFromStore(store);

const didAuthenticate$ = state$.distinctUntilChanged(state => state.login.route == "/principal").filter(state => state.login.route == "/principal");
didAuthenticate$.subscribe((state) => {
  store.getState().cattleList.authenticationToken = state.login.authenticationToken;
  store.getState().cattleRegister.authenticationToken = state.login.authenticationToken;
  memoryHistory.push("/principal");
});

const didGoToEditCattle$ = state$.distinctUntilChanged(state => state.cattleList.route == "/cattle/register").filter(state => state.cattleList.route == "/cattle/register");
didGoToEditCattle$.subscribe((state) => {
  state.cattleList.route = '';
  memoryHistory.push("/cattle/register/"+state.cattleList.cattle._id);
});
