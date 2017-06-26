//cool trick to DRY code from
//https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65

import * as myself from "./"

export {default as AppComponent} from "./app"
export {default as NoMatchComponent} from "./no-match"
export {default as LoginComponent} from "./login"
export {default as HeaderComponent} from "./header"
export default myself

 