import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {RightMenuLoggedIn} from "./"
import "./header.css"

// TODO: convert these right menu button to using flex box instead
// TODO: consider moving These button tho it's own file
const RightMenuNotLoggedIn = (props) => {
    
    return (
        <div className="flex-centering-all">
            <Link to="/login" >
                <FlatButton className="appbar__flat-button" label="Login" secondary={true} />
            </Link>
            <Link to="/signup" >
                <FlatButton className="appbar__flat-button" label="Sign up" secondary={true} />
            </Link>
        </div>

    )
}


class Header extends Component {

    render() {

    

        const appBarProps = {
            title: <Link to="/">React Material</Link>,
            showMenuIconButton: this.props.auth.authenticated === true,
            iconElementRight: this.props.auth.authenticated ? <RightMenuLoggedIn /> : <RightMenuNotLoggedIn />,
          
        }
        return (
            <div className="">
                <AppBar {...appBarProps}
                />
            </div>
        )

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Header)