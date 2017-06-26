import axios from "axios"
import {API_URL} from "../utils/constants"
import {AUTH,DEAUTH} from "./types"
export function loginUser({email,password},successCallback,errorCallback){
    // submit email and password to user

    const request = axios.post(`${API_URL}/login`,{email,password})
    request.then(res => {
        if (successCallback) successCallback(res)
    },err=> {
        if (errorCallback) errorCallback(err)
    })
    return {
        type:AUTH,
        payload: request
    }

}

export function signoutUser(){
    localStorage.removeItem("token")
    return {
        type:DEAUTH,
        payload: {}
    }
}