import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import List from '../components/List';
 
console.log(List)
export default (
    <Route path="/" component={App}>
        <IndexRoute component={List} />
    </Route>
);

