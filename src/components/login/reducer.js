import { AUTH, AUTH_PENDING, 
        AUTH_FULFILLED, AUTH_REJECTED, DEAUTH } 
from "../../actions/types"

const authInitialState = {}

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTH_FULFILLED:
            console.log("reducers auth fullfilled", action.payload)
            return {...state, authenticated:true, error: ""}
        case AUTH_REJECTED:
            console.log("reducers auth rejected", action.payload)

            return {...state, authenticated: false, error: action.payload.response}
        case AUTH:
            console.log("reducers auth ", action.payload)
            return state
        case AUTH_PENDING:
            console.log("reducers auth pending ", action.payload)
            return state
        case DEAUTH:
            console.log("Deauth",action.payload)
            return {...state, authenticated:false}
        default:
            return state
    }
}
export default authReducer