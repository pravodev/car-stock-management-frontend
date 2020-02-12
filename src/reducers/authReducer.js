import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
  } from './authAction'
  
  function auth(state = {
      isFetching: false,
      isAuthenticated: localStorage.getItem('access_token') ? true : false,
      errorMessage: ""
    }, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
          user: action.credentials,
          errorMessage: ''
        })
      case LOGIN_SUCCESS:
        console.log("TCL: SUCCESS", action)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: '',
          user: action.user
        })
      case LOGIN_FAILURE:
      console.log("TCL: LOGIN_FAILURE", action)
        console.log("TCL: state", state)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          errorMessage: action.errorMessage
        })
      case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false
        })
      default:
        return state
    }
  }

  export default auth