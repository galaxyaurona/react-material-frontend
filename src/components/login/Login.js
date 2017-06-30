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
import CircularProgress from 'material-ui/CircularProgress';
import {
    requiredValidatorGenerator,
    emailValidatorGenerator,
    renderMaterialInput
} from "../../utils"


import "./login.css"




const emailValidation = requiredValidatorGenerator("Email is required")
const emailRequired = emailValidatorGenerator("Please input a valid email")
const passwordRequired = requiredValidatorGenerator("Password is required")


class Login extends Component {
    componentDidMount() {
        // focusing on email field at render
        /*this.refs.email // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus(); // on TextField*/
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("next props", nextProps.auth)
    }
    // TODO: fix submit doesn't disable button
    handleOnSubmit({ email, password }) {


        return this.props.loginUser({ email, password }, response => {
            // god response from server

            if (response.data.success) {
                // and it's defnitely success
                // handle JWT saving to local storage here
                localStorage.setItem("token", response.data.token)
                //redirect to root route
                this.props.history.push("/")
            }
        }, (error) => {
            console.log("error callback toplevel", error)
        })
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props
        const emailField = {
            name: "email",
            type: "email",
            component: TextField,
            hintText: "Email",
            floatingLabelText: "Email",
            className: "form__text-field--full-width",
            validate: [emailRequired, emailValidation],
            refProps: {
                ref: "email",
                withRef: true
            },
            disabled: submitting,
        }
        const passwordField = {
            name: "password",
            type: "password",
            component: TextField,
            className: "form__text-field--full-width",
            hintText: "Password",
            floatingLabelText: "Password",
            validate: [passwordRequired],
            disabled: submitting,
        }
        const formFields = [emailField, passwordField]
        const circularProgressProp = {
            color: "white",
            size: 20,
            style:{
                top:"8px",
                right:"8px"
            },
            thickness:2
        }
        // TODO: display error here base on form
        return (
            <div className="compoment__wrapper--flex-centering-all">

                <Paper className="login-paper" zDepth={2} >
                    <form className="form--full-height" onSubmit={handleSubmit(this.handleOnSubmit.bind(this))}>
                        <h2 className="form__header-text--custom-margin ">Login</h2>
                        <hr className="hr--no-margin" />
                        <div className="form__content">
                            {formFields.map(field => renderMaterialInput(field), this)}
                        </div>


                        <div className="action-button__row">

                            <RaisedButton
                                onTouchTap={() => this.props.history.push("/signup")}
                                className="pull-right"
                                secondary={true}
                                type="button"

                                label="Sign up">

                            </RaisedButton>
                            <RaisedButton
                                className="pull-right"
                                style={{ marginRight: "20px" }}
                                disabled={submitting}
                                primary={true}
                                type="submit"
                                children={submitting ? <CircularProgress {...circularProgressProp}  /> : undefined}
                                label="Login"
                                labelPosition="before">

                            </RaisedButton>
                        </div>

                    </form>

                </Paper>

            </div>

        )
    }
}

const LoginForm = reduxForm({
    form: "loginForm",
    fields: ["email", "password"]
})(Login)

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginUser: bindActionCreators(loginUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)