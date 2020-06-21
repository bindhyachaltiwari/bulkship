#### Store
---

###### folder structure
- store
    - actions
        - constants.js : enter actions types to be dispatched here 
        - index.js : enter actions to be dipatched
    - reducer.js : pure function just to update store as per action dispatched
    - saga.js : contains asynchronous function of whole app

##### data flow
* define actionTypes constant in actions/constants, for e.g. LOGIN_ASYNC
* define actions in actions/index.js, for e.g. setLoginDetails
* add an entry for that action to reducer (in case of synchronous), call setLoginDetails directly from here
    * In case of asynchronous, add generator function to saga.js for that action, 
        * add a generator function for e.g. login, to saga.js
        * call setLoginDetails from login function
* dispatch actions from module component