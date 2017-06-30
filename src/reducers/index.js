
import { combineReducers } from 'redux'
import {reducer as form} from "redux-form"
import {reducer as authReducer} from "../components/login"
import {reducer as signUpReducer} from "../components/signup"
export default combineReducers({
    form,
    auth: authReducer,
    signup: signUpReducer
})