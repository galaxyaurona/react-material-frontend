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


// TODO: fix the styling here
import "./login.css"

const cardStyle = {
    height: 300,
    width: 450,
    margin: 20,
    textAlign: 'center',
    display: 'flex',
};
// TODO: migrate these 2 function to separate utils file

// validation function
function requiredValidatorGenerator(error = "Required") {
    return value => (value == null ? error : undefined);
}

function emailValidatorGenerator(error = "Invalid email") {
    return value =>
        (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? error
            : undefined);
}

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


    handleOnSubmit({ email, password }) {
        console.log("submitting,b4", this.props)

        this.props.loginUser({ email, password }, response => {
            // god response from server

            if (response.data.success) {
                // and it's defnitely success
                // handle JWT saving to local storage here
                localStorage.setItem("token",response.data.token)
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

        return (
            <div key={field.name} className="col-xs-12">
                <Field
                    {...field}
                    {...fieldRefProps}
                />
            </div>

        )
    }
    render() {

        const emailField = {
            name: "email",
            type: "email",
            component: TextField,
            hintText: "Email",
            floatingLabelText: "Email",
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
            hintText: "Password",
            floatingLabelText: "Password",
            validate: [passwordRequired],

        }
        const formFields = [emailField, passwordField]
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <div className="login-wrapper flexbox-container">

                <Paper className="" style={cardStyle} zDepth={2} >
                    <form onSubmit={handleSubmit(this.handleOnSubmit.bind(this))}>
                        <h3 className="">Login</h3>
                        {formFields.map(field => this.renderMaterialTextInput(field), this)}


                        <RaisedButton disabled={submitting} primary={true} type="submit" label="Login"></RaisedButton>
                        <RaisedButton disabled={submitting} secondary={true} type="button" label="Sign up"></RaisedButton>
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