import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from 'react-router-dom';

import store from "./store/index";

import App from './components/App';
import List from './components/List';
import Test from './components/Test';

render(
  <Provider store={store}>
    <HashRouter>
        <App>
            <Route exact path="/" component={List} />
            <Route path="/test" component={Test} />
        </App>
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
