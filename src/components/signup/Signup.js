import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import { signupUser, unmountSignup } from "../../actions"
import { bindActionCreators } from "redux"
import axios from "axios"
import { API_URL } from "../../utils/constants"
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {
    TextField
} from "redux-form-material-ui"
import {
    requiredValidatorGenerator,
    emailValidatorGenerator,
    renderMaterialInput
} from "../../utils"
import "./signup.css"
import Rx from "rxjs/Rx"
const emailValidation = requiredValidatorGenerator("Email is required")
const emailRequired = emailValidatorGenerator("Please input a valid email")
const passwordRequired = requiredValidatorGenerator("Password is required")
const passwordConfirmationRequired = requiredValidatorGenerator("Password confirmation is required")
// validate match password, passed in to redux form
const passwordMatch = (value, allValues, props) => {

    if (allValues.password && allValues.passwordConfirmation && (allValues.password !== allValues.passwordConfirmation))
        return "Password confirmation does not match"
    else
        return undefined
}
// TODO: ADD progress bar when submitting
// TODO: 
// FIXME: THERE IS A GLITCH BECAUSE THROWING ERROR WITHOUT CHECKING IF CURRENT EMAIL IS EQUAL TO STATE EMAIL
const asyncValidate = ({ email }, dispatch, props) => {
    // TODO: use constants for this
    if (email != props.signup.email) {
        dispatch({
            type: "EMAIL_VALIDATING",
            payload: email
        })
        props.clearAsyncError()


        return axios.post(`${API_URL}/check-existing-email`, { email }).then(success => {
            let message = { email: "You can use this email", emailExist: false }
            dispatch({
                type: "EMAIL_VALIDATED",
                payload: {
                    email,
                    message
                }
            })


        }, error => {
            if (error.response.status == 422) {
                let message = { email: "This email has been used", emailExist: true }
                dispatch({
                    type: "EMAIL_EXIST",
                    payload: {
                        email,
                        message
                    }
                })
                throw message
            }

            return error.response.data
        })
    } else { // don't check the email again
        return new Promise(resolve => {
            if (!props.signup.emailUsable)
                throw props.signup.message
            console.log("resolving")
            resolve()
        })



    }


    //return dispatch(checkExistingEmail(email));
}

class Signup extends Component {
    constructor(props) {
        super(props)


    }
    handleOnSubmit({ email, password }) {
        console.log("submitting")
        return this.props.signupUser({ email, password }, response => {
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
    componentDidMount() {

    }
    
    handleEmailChange(event) {


    }

    render() {
        const { asyncValidating, handleSubmit, pristine, submitting } = this.props
        const successStyle = {
            color: "green"
        }
        const emailField = {
            customProps: {
                asyncValidating,
                validatedWithIcon: this.props.signup.emailUsable,
            },
            name: "email",
            type: "email",
            component: TextField,
            hintText: "Email *",
            floatingLabelText: "Email *",
            className: "form__text-field--full-width",
            floatingLabelFocusStyle: this.props.signup.emailUsable ? successStyle : undefined,
            validate: [emailRequired, emailValidation],
            refProps: {
                ref: "email",
                withRef: true
            },
            errorStyle: this.props.signup.emailUsable ? successStyle : undefined,
            errorText: (this.props.signup.message && !this.props.signup.message.emailExist) ? this.props.signup.message.email : undefined, 
            disabled: submitting,
        }
        const passwordField = {
            name: "password",
            type: "password",
            component: TextField,
            className: "form__text-field--full-width",
            hintText: "Password *",
            floatingLabelText: "Password *",
            validate: [passwordRequired, passwordMatch],
            disabled: submitting,
        }
        const passwordConfirmationField = {
            name: "passwordConfirm",
            type: "password",
            component: TextField,
            className: "form__text-field--full-width",
            hintText: "Password confirmation *",
            floatingLabelText: "Password confirmation *",
            validate: [passwordConfirmationRequired, passwordMatch],
            disabled: submitting
        }
        const formFields = [emailField, passwordField, passwordConfirmationField]
        const formFieldsRendered = formFields.map(field => renderMaterialInput(field), this)

        return (
            <div className="compoment__wrapper--flex-centering-all">
                <Paper className="signup-paper" zDepth={2} >
                    <form className="form--full-height" onSubmit={handleSubmit(this.handleOnSubmit.bind(this))}>
                        <h2 className="form__header-text--custom-margin ">Sign up </h2>
                        <hr className="hr--no-margin" />
                        <div className="form__content">
                            {formFieldsRendered}
                        </div>


                        <div className="action-button__row">

                            <RaisedButton className="pull-right" disabled={submitting} primary={true} type="submit" label="Sign up"></RaisedButton>
                        </div>
                    </form>

                </Paper>
            </div>
        )
    }
    componentWillUnmount() {
        this.props.unmountSignup()
    }
}
const SignUpForm = reduxForm({
    form: "SignupForm",
    asyncValidate,
    asyncBlurFields: ['email'],
    field: ["email", "password", "passwordConfirm"]
})(Signup)
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signupUser: bindActionCreators(signupUser, dispatch),
        unmountSignup: bindActionCreators(unmountSignup, dispatch)
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        signup: state.signup
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)