
import { combineReducers } from 'redux'
import {reducer as form} from "redux-form"
import {reducer as authReducer} from "../components/login"

export default combineReducers({
    form,
    auth: authReducer
})