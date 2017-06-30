import React, { Component } from 'react'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {signoutUser} from "../../actions"
class RightMenuLoggedIn extends Component{
    // TODO: add a confirm dialog bar for log out here if possible
    // TODO: change this to button with avatar
    // TODO: add in notification and avatar
    handleSignOut(){
        this.props.signoutUser()
    }
    render() {
        return (
            <IconMenu 
                {...this.props.iconMenuProps}
                animated
                iconButtonElement={
                    <IconButton><MoreVertIcon color="white"/></IconButton>
                }>
                <MenuItem primaryText="Refresh" />

                <MenuItem onTouchTap={this.handleSignOut.bind(this)} primaryText="Sign out" />
            </IconMenu>


        )
    }

}
const  mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signoutUser: bindActionCreators(signoutUser, dispatch)
    }
}
export default connect(null,mapDispatchToProps)(RightMenuLoggedIn)