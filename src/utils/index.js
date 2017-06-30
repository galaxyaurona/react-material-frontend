import * as myself from "./"

// validation function
export const requiredValidatorGenerator = (error = "Required") => {
    return value => (value == null ? error : undefined);
}

export const emailValidatorGenerator = (error = "Invalid email") => {
    return value =>
        (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? error
            : undefined);
}



export {default as registerServiceWorker, unregister as unregiserServiceWorker} from "./registerServiceWorker"
export {API_URL} from "./constants"
export {renderMaterialInput} from "./form"
export default myself
