
import { combineReducers } from 'redux'
import {reducer as form} from "redux-form"
import {reducer as authReducer} from "../components/login"
import {reducer as signUpReducer} from "../components/signup"
import {reducer as appReducer} from "../components/app"
export default combineReducers({
    form,
    app: appReducer,
    auth: authReducer,
    signup: signUpReducer
})