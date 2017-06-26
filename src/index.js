import React from 'react';
import ReactDOM from 'react-dom';
import { registerServiceWorker } from './utils';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers"
import  promiseMiddleware from "redux-promise-middleware"

import { Switch, Route } from "react-router"
import {
    BrowserRouter,
    Link,
    Redirect,
    withRouter
} from "react-router-dom"
// or another component import
import { App } from "./components/app"
import { NoMatch } from "./components/no-match"





const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(
        promiseMiddleware()
    ),
    // other store enhancers if any
));

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <Route path="/" component={App}></Route>
        </BrowserRouter>

    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
