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
import WorkloadList                                         from './components/workload.list.component';
import SendFile                                             from './components/send.file.component';
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
    <IndexRoute component={Login}></IndexRoute>/>
    <Route path="/workload/list" component={WorkloadList}></Route>
    <Route path="/upload/file" component={SendFile}></Route>
  </Route>
);

render(
  <Provider store={store}>
    <Router history={memoryHistory} routes={routes} />
  </Provider>,
  document.getElementById('totem-web')
);

const state$ = observableFromStore(store);

const didAuthenticate$ = state$.distinctUntilChanged(state => state.login.route == "/workload/list").filter(state => state.login.route == "/workload/list");
didAuthenticate$.subscribe((state) => {
  store.getState().workloadList.authenticationToken = state.login.authenticationToken;
  store.getState().send_file.authenticationToken = state.login.authenticationToken;
  memoryHistory.push("/workload/list");
});
