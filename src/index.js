import React from 'react';
import ReactDOM from 'react-dom';
import { registerServiceWorker } from './utils';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers"
import promiseMiddleware from "redux-promise-middleware"
import thunk from 'redux-thunk';
import { Switch, Route } from "react-router"
import {AUTH_FULFILLED,DEAUTH} from "./actions/types"
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
        promiseMiddleware(),
        thunk
    ),
    // other store enhancers if any
));

// TODO: make sure token is verified with AJAX request to backend first
// then deauth// auth accordingly
const token = localStorage.getItem("token")
if (token) {
    store.dispatch({
        "type": AUTH_FULFILLED
    })
}else{
    store.dispatch({
        "type": DEAUTH
    })
} 


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
