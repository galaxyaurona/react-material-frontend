import React, { Component } from "react"
import { connect } from "react-redux"
const timeToReadModal = 1000
export default function (ComposedComponent) {
    class RequireUnauth extends Component {
        componentWillMount() {
            if (this.props.auth.authenticated) {
                // time delay to show modal, 0 mean no modal is showing
                const timeDelay = this.props.app.authRedirecting ? timeToReadModal : 0
                setTimeout(() => {
                    console.log("executing redirect",this)
                    this.props.history.push("/")
                }, timeDelay)
            }
        }

        componentWillUpdate(nextProps) {

            if (nextProps.auth.authenticated) {
                // time delay to show modal
                const timeDelay = this.props.app.authRedirecting ? timeToReadModal : 0
                setTimeout(() => {
                    console.log("executing redirect",this)
                    this.props.history.push("/")
                }, timeDelay)

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


    return connect(mapStateToProps)(RequireUnauth)
}



