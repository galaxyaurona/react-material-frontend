import React, { Component } from 'react';
import images, { logo } from "../../images";

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton"
import { NoMatch } from "../no-match"
import { Login } from "../login"
import { Signup } from "../signup"
import { Dashboard, PublicDashboard } from "../dashboard"
import { Switch, Route } from "react-router"
import { Header } from "../header"
import Dialog from 'material-ui/Dialog';
import { RequireAuth, RequireUnauth } from "../auth-guards"
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from "react-redux"
class App extends Component {
  handleOnEnter() {

  } 
  componentWillUpdate() {

  }

  render() {
    // TODO: try making 2 separate component , one for logged in and one for not loggedIn

  
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header></Header>
          <Switch>

            <Route path="/login" component={RequireUnauth(Login)}>
            </Route>
            <Route path="/signup" component={RequireUnauth(Signup)}>
            </Route>

            <Route exact path="/" component={RequireAuth(Dashboard)} />
            <Route component={NoMatch} onEnter={this.handleOnEnter.bind(this)}></Route>
          </Switch>

          <Dialog
            title={this.props.app.authRedirectingMessage }
            open={this.props.app.authRedirecting}
            modal={true}
          >
            <LinearProgress></LinearProgress>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,

  }
}

export default connect(mapStateToProps)(App);
