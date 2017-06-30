import {AUTH_SUCCESS_REDIRECT,AUTH_SUCCESS_REDIRECT_FULFILLED} from "../../actions/types"


const AppInitialState = {authRedirecting: false, authRedirectingMessage: ""}
const AppReducer = (state = AppInitialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS_REDIRECT:
            return {...state, authRedirecting: true, authRedirectingMessage:action.payload}
        case AUTH_SUCCESS_REDIRECT_FULFILLED:
            return {...state, authRedirecting: false, authRedirectingMessage:""}
        default:
            return state
    }
}
export default AppReducer