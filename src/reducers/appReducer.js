import {
    ERROR_MESSAGE
  } from './appAction'
  
  function app(state = {
      errorMessage: ""
    }, action) {
    switch (action.type) {
      case ERROR_MESSAGE:
        return Object.assign({}, state, {
          errorMessage: action.errorMessage
        })
      default:
        return state
    }
  }

  export default app