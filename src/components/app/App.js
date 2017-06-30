import React, { Component } from 'react';
import images, { logo } from "../../images";

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton"
import { NoMatch } from "../no-match"
import { Login } from "../login"
import { Signup } from "../signup"
import { Switch, Route } from "react-router"
import { Header } from "../header"
import Dialog from 'material-ui/Dialog';
import { connect } from "react-redux"
class App extends Component {
  handleOnEnter() {
    console.log("entering", this)
  }
  componentWillUpdate() {
    console.log("location", this.props)
  }
  render() {

    console.log(this.props.app)
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header></Header>
          <Switch>

            <Route path="/login" component={Login}>
            </Route>
            <Route path="/signup" component={Signup}>
            </Route>
            <Route component={NoMatch} onEnter={this.handleOnEnter.bind(this)}></Route>
          </Switch>
          <Dialog
            title={""}
            open={false}
            modal={true}

          >

          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(App);
