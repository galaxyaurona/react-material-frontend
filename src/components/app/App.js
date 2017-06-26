import React, { Component } from 'react';
import images, { logo } from "../../images";

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton"
import { NoMatch } from "../no-match"
import { Login } from "../login"
import { Switch, Route } from "react-router"
import { Header } from "../header"
class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header></Header>
          <Switch>
        
            <Route path="/login" component={Login}>
            </Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
