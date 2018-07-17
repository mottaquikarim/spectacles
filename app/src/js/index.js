import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from 'react-router-dom';

import store from "./store/index";

import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';

const app = document.getElementById("app");

if (app) {
    render(
      <Provider store={store}>
        <HashRouter>
            <App>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/workspace/:uuid" component={Workspace} />
            </App>
        </HashRouter>
      </Provider>,
      app
    );
}
