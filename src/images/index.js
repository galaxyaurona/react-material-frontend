//cool trick to DRY code from
//https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65

import * as myself from "./"

export {default as logo} from "./logo.svg"
export default myself

 