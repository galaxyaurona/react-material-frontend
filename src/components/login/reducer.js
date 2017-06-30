import {
    AUTH, AUTH_PENDING,
    AUTH_FULFILLED, AUTH_REJECTED, DEAUTH
}
    from "../../actions/types"

const authInitialState = {}

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTH_FULFILLED:

            return { ...state, authenticated: true, pending: false, error: "" }
        case AUTH_REJECTED:


            return { ...state, authenticated: false, pending: false, error: action.payload.response }
        case AUTH:

            return state
        case AUTH_PENDING:

            return { ...state, authenticated: false, pending: true, error: undefined }
        case DEAUTH:

            return { ...state, authenticated: false,  pending: false }
        default:
            return state
    }
}
export default authReducer