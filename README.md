# Custom React-Redux-Material Seed 

## Preface
This is the seed setup for **React-Redux** application , utilizing material design philosophy. This seed repo incorporate Redux, Redux time travel extension tool and an opinionated component base folder structure

This is generated using  [create-react-app](https://github.com/facebookincubator/create-react-app)  and then configurated to use
- **[Material UI](http://www.material-ui.com/)**
- **[React router](https://github.com/ReactTraining/react-router)**
- **[Redux](http://redux.js.org/docs/introduction/)** 
- **[Redux-promise](https://github.com/acdlite/redux-promise)**
- **Time travel debugging with [redux-devtool-extensions](https://github.com/zalmoxisus/redux-devtools-extension)**

## Folder structure
```
root
│   README.md
│   node_modules
│   package.json
│───public
│   │   index.html<-- index.html for serving
│   │   favicon.html
│
└───src
│   │   index.css <-- index.html
│   │   index,js <--- index rendering  to html
│   │
│   └───components <--- reacts components
|   |   └───App  <-- Root component
|   |   |    | App.css
|   |   |    | App.js
|   |   |    | App.test.js
|   |   |    | index.js <-- index export/import   
|   |   └───Component 2 
|       | index.js <--- indexing all the components
|   └───styles *css/scss folder, styling for root /mixins
|   └───images 
|   |   | ...
|   |   | index.js <-- index export/import images
```

## Import / export
### Single component index.js
https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65
```javascript ES6
// index DRY
import * as myself from "./"
export default myself

export {default as App} from "./App"
export {default as Reducer} from "./reducer"
```
Exporting the actual component using its name, all the others by its type 

### All Component index.js
```javascript
//cool trick to DRY code from
//https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65

import * as myself from "./"

export {default as AppComponent} from "./app"
export default myself
```
exporting the entire component namespace as `<ComponentName>`Component

This helps us import the entire componentspackage and extract what we need or target a specific component 

```javascript
// one way
import { AppComponent} from './components';
const {App} = AppComponent

// or another component import
import {App} from "./components/app"
```