import axios from "axios"
import { API_URL } from "../utils/constants"
import { AUTH, DEAUTH, EMAIL_CHECKING_CANCELLED,CHECK_EMAIL_EXISTING,AUTH_CLEAR_REJECT_ERROR,
         AUTH_SUCCESS_REDIRECT,AUTH_SUCCESS_REDIRECT_FULFILLED } from "./types"
import ReduxThunk from 'redux-thunk'
export function loginUser({ email, password }, successCallback, errorCallback) {
    // submit email and password to user

    const request = axios.post(`${API_URL}/login`, { email, password })
    request.then(res => {
        if (successCallback) successCallback(res)
    }, err => {
        if (errorCallback) errorCallback(err)
    })
    return {
        type: AUTH,
        payload: request
    }

}
export function signupUser({ email, password }, successCallback, errorCallback) {
    const request = axios.post(`${API_URL}/signup`, { email, password })
    request.then(res => {
        if (successCallback) successCallback(res)
    }, err => {
        if (errorCallback) errorCallback(err)
    })
    return {
        type: AUTH,
        payload: request
    }
}
// write this in redux thunk so it can be used in asyncValidate for redux form
export function checkExistingEmail(email, successCallback, errorCallback) {
    const request = axios.post(`${API_URL}/check-existing-email`,  email )
    request.then(res => {
        if (successCallback) successCallback(res)
    }, err => {
        if (errorCallback) errorCallback(err)
    })
    return {
        type: CHECK_EMAIL_EXISTING,
        payload: request
    }
}

export function unmountSignup(){
    return {
        type: EMAIL_CHECKING_CANCELLED,
    
    }
}
export function clearAuthRejectErrors(src){
    return {
        type: AUTH_CLEAR_REJECT_ERROR,
        payload:src
    }
}
export function authSuccessRedirect(message){
    return {
        type: AUTH_SUCCESS_REDIRECT,
        payload: message
    }
}
export function authSuccessRedirectFulfilled(message){
    return {
        type: AUTH_SUCCESS_REDIRECT_FULFILLED,
        payload: message
    }
}


export function signoutUser() {
    localStorage.removeItem("token")
    return {
        type: DEAUTH,
        payload: {}
    }
}