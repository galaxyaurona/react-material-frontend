import React, { Component } from "react"
import { connect } from "react-redux"
import { authSuccessRedirectFulfilled } from "../../actions"
import { bindActionCreators } from "redux"
export default function (ComposedComponent) {
    class RequireAuth extends Component {
        componentWillMount() {
            if (!this.props.auth.authenticated) {
                this.props.history.push("/login")
            } else {
                // if it is transist from login or signup, modal is up, need to dismiss modal
                if (this.props.app.authRedirecting) {
                    this.props.authSuccessRedirectFulfilled()
                }
            }
        }
        componentWillUpdate(nextProps) {

            if (!nextProps.auth.authenticated) {
                this.props.history.push("/login")
            } else {
                // if it is transist from login or signup, modal is up, need to dismiss modal
                if (this.props.app.authRedirecting) {
                    this.props.authSuccessRedirectFulfilled()
                }
            }
        }
        render() {

            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            auth: state.auth,
            app: state.app
        }
    }
    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            authSuccessRedirectFulfilled: bindActionCreators(authSuccessRedirectFulfilled, dispatch)
        }
    }
    return connect(mapStateToProps,mapDispatchToProps)(RequireAuth)
}



