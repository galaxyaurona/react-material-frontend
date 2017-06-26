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
import { requiredValidatorGenerator, emailValidatorGenerator } from "../../utils"

// TODO: fix the styling here , left align stuff , add breakline on the form
import "./login.css"
// TODO: change card style into
const cardStyle = {
    height: 300,
    width: 450,
    margin: 20,
    textAlign: 'left',
    display: 'block',
};
// TODO: migrate these 2 function to separate utils file

const emailValidation = requiredValidatorGenerator("Email is required")
const emailRequired = emailValidatorGenerator("Please input a valid email")
const passwordRequired = requiredValidatorGenerator("Password is required")


class Login extends Component {
    componentDidMount() {
        // focusing on email field at render
        this.refs.email // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus(); // on TextField
    }

    // TODO: fix submit doesn't 
    handleOnSubmit({ email, password }) {
        console.log("submitting,b4", this.props)

        this.props.loginUser({ email, password }, response => {
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
    renderMaterialTextInput(field) {
        // default params
        if (!field.className) { field.className = "" }
        if (!field.type) { field.type = "text" }
        if (!field.component) { field.component = {} }
        if (!field.hintText) { field.hintText = "Unspecified hint text" }
        if (!field.validate) { field.validate = [] }
        let fieldRefProps = {}
        if (field.refProps) {
            fieldRefProps = { ...field.refProps }
        }
        // prevent unspecified html attribute 
        delete field.refProps
        field.errorStyle = {
            float:"left"
        }
        return (

            <Field
                key={field.name}
                {...field}
                {...fieldRefProps}
            />


        )
    }
    render() {

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
            }
        }
        const passwordField = {
            name: "password",
            type: "password",
            component: TextField,
            className: "form__text-field--full-width",
            hintText: "Password",
            floatingLabelText: "Password",
            validate: [passwordRequired],

        }
        const formFields = [emailField, passwordField]
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <div className="login-component__wrapper flexbox-container">

                <Paper className="" style={cardStyle} zDepth={2} >
                    <form className="login-form" onSubmit={handleSubmit(this.handleOnSubmit.bind(this))}>
                        <h3 className="form__header-text--custom-margin ">Login</h3>
                        <hr className="hr--no-margin" />
                        <div className="form-content">
                            {formFields.map(field => this.renderMaterialTextInput(field), this)}
                        </div>


                        <div className="button-row">
                           
                            <RaisedButton className="pull-right" disabled={submitting} secondary={true} type="button" label="Sign up"></RaisedButton>
                            <RaisedButton className="pull-right" style={{marginRight:"30px"}} disabled={submitting} primary={true} type="submit" label="Login"></RaisedButton>
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