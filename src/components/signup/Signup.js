import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import { loginUser } from "../../actions"
import { bindActionCreators } from "redux"
import {
    TextField
} from "redux-form-material-ui"
import {requiredValidatorGenerator, emailValidatorGenerator} from "../../utils"

const emailValidation = requiredValidatorGenerator("Email is required")
const emailRequired = emailValidatorGenerator("Please input a valid email")
const passwordRequired = requiredValidatorGenerator("Password is required")

class Signup extends Component {
    render(){
        return (
            <div className=""> Sign Up component</div>
        )
    }
}

 export default connect(null, null)(Signup)