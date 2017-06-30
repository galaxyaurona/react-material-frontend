import {
    AUTH, AUTH_PENDING, AUTH_CLEAR_REJECT_ERROR,
    AUTH_FULFILLED, AUTH_REJECTED, DEAUTH
}
    from "../../actions/types"

const authInitialState = {}

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTH_CLEAR_REJECT_ERROR:
            // error exist and it's equal to the dispatcher source
            // clear error so it doesn't render on the form anymore
            if (state.error && action.payload == state.error.source)
                return { ...state, error: undefined }
            else
                return state
        case AUTH_FULFILLED:

            return { ...state, authenticated: true, pending: false, error: undefined }
        case AUTH_REJECTED:
            //TODO: handle error no internet here

            return { ...state, authenticated: false, pending: false, error: action.payload.response.data.err }
        case AUTH:

            return state
        case AUTH_PENDING:

            return { ...state, authenticated: false, pending: true, error: undefined }
        case DEAUTH:

            return { ...state, authenticated: false, pending: false }
        default:
            return state
    }
}
export default authReducer