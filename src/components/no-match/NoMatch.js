import React, { Component } from "react"


export class NoMatch extends Component {
    componentWillMount() {
        console.log(this.props)
        const token = localStorage.getItem("token")
        console.log("token",token)
    }
    render() {
        return (
            <div>
                The page you are looking for does not exist
        </div>
        )
    }
}

export default NoMatch