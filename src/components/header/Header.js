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
// TODO: consider moving These button tho it's own file
const RightMenuNotLoggedIn = (props) => {
    return (
        <div className="flexbox-container">
            <Link to="/login" >
                <FlatButton label="Login" secondary={true} />
            </Link>
            <Link to="/signup" >
                <FlatButton label="Sign up" secondary={true} />
            </Link>
        </div>

    )
}


class Header extends Component {

    render() {
        //TODO : improve upon this styling
        //TODO: change it to flexbox container
        const style = { marginTop: "14px" }
        const appBarProps = {
            title: <Link to="/">React Material</Link>,
            showMenuIconButton: this.props.auth.authenticated == true,
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