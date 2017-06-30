import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import { loginUser, clearAuthRejectErrors, authSuccessRedirect } from "../../actions"
import { bindActionCreators } from "redux"
import {
    TextField
} from "redux-form-material-ui"
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
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

    }

    handleOnSubmit({ email, password }) {


        return this.props.loginUser({ email, password }, response => {
            // god response from server

            if (response.data.success) {
                // and it's defnitely success
                // handle JWT saving to local storage here
                localStorage.setItem("token", response.data.token)
                //redirect to root route, use HOC auth guards
                //this.props.history.push("/")
                // to open the modal
                this.props.authSuccessRedirect("You have succesfully log in! Redirecting...")
            }
        }, (error) => {
            // so, expoiting the state change will trigger component re rendering
            // we can set the errorText directly
            // then clear it in the onChange
            console.log("error callback toplevel", error.response.data)

        })
    }

    handleEmailChange(event) {
        this.props.clearAuthRejectErrors("email")
    }
    handlePasswordChange(event) {
        this.props.clearAuthRejectErrors("password")

    }
    renderRejectError(source) {

        if (this.props.auth.error && this.props.auth.error.source == source) {

            return this.props.auth.error.msg
        } else {
            return undefined
        }
    }
    render() {
        console.log("login props", this.props)
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
            errorText: this.renderRejectError("email"),
            disabled: submitting,
            onChange: this.handleEmailChange.bind(this)
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
            errorText: this.renderRejectError("password"),
            onChange: this.handlePasswordChange.bind(this)
        }
        const formFields = [emailField, passwordField]
        const circularProgressProp = {
            color: "white",
            size: 20,
            style: {
                top: "8px",
                right: "8px"
            },
            thickness: 2
        }

        return (
            <div className="compoment__wrapper--flex-centering-all">

                <Paper className="login-paper" zDepth={2} >
                    <form className="form--full-height" onSubmit={handleSubmit(this.handleOnSubmit.bind(this))}>
                        <h2 className="form__header-text--custom-margin ">Login</h2>
                        <hr className="hr--no-margin" />
                        {submitting ? <LinearProgress></LinearProgress> : undefined}
                        <div className="form__content">
                            {formFields.map(field => renderMaterialInput(field), this)}
                        </div>


                        <div className="action-button__row">

                            <RaisedButton
                                onTouchTap={() => this.props.history.push("/signup")}
                                className="pull-right"
                                secondary={true}
                                type="button"
                                disabled={submitting}
                                label="Sign up">

                            </RaisedButton>
                            <RaisedButton
                                className="pull-right"
                                style={{ marginRight: "20px" }}
                                disabled={submitting}
                                primary={true}
                                type="submit"

                                label="Login"
                                labelPosition="before">

                            </RaisedButton>
                        </div>

                    </form>

                </Paper>

            </div>

        )
    }
    componentWillUnmount() {
        console.log("unmouting")
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
        loginUser: bindActionCreators(loginUser, dispatch),
        clearAuthRejectErrors: bindActionCreators(clearAuthRejectErrors, dispatch),
        authSuccessRedirect: bindActionCreators(authSuccessRedirect, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)