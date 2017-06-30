import {EMAIL_VALIDATING,EMAIL_EXIST,EMAIL_VALIDATED,EMAIL_CHECKING_CANCELLED} from "../../actions/types"

const signupInitialState = { emailChecked: false }
 
const signupReducer = (state = signupInitialState, action) => {

    switch (action.type) {
        case EMAIL_VALIDATED:
            // if is checking email and the email is in cached state
            if (state.emailChecking && (state.email === action.payload.email))
                return { ...state, emailUsable: true, emailChecking: false, message: action.payload.message}
            else
                return state
        case EMAIL_VALIDATING:
         
            return { ...state, emailUsable: false, emailChecking: true, email: action.payload,message: undefined }
        case EMAIL_EXIST:
            if (state.emailChecking && (state.email === action.payload.email)) {
                console.log("rewiring state",action.payload)
                return { ...state, emailUsable: false, emailChecking: false, message: action.payload.message }
            }
                
            else
                return state

        case EMAIL_CHECKING_CANCELLED:
      
            return { ...state, emailUsable: false, emailChecking: false, email: undefined, message: undefined }
        default:
            return state
    }
}
export default signupReducer