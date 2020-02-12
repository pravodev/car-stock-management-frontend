import {axios} from '../utils'
// import Axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogin(crendentials) {
    return {
      type: LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      crendentials,
      errorMessage: ""
    }
  }
  
  function receiveLogin(user) {
    return {
      type: LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      id_token: user.token,
      user: user.user
    }
  }
  
  function loginError(message) {
    console.log("TCL: loginError -> KAMPRET", message)
    return {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      errorMessage: message
    }
  }

  function requestLogout() {
    return {
      type: LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: true
    }
  }
  
  function receiveLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false
    }
  }
  
  export function loginUser(credentials) {

    return dispatch => {
      // We dispatch requestLogin to kickoff the call to the API
      dispatch(requestLogin(credentials))
      return axios.post('/api/auth/login', credentials)
            .then(response => {
                const {token, user} = response.data

                localStorage.setItem('access_token', token)
                dispatch(receiveLogin({token, user}))
                console.log("TCL: loginUser -> response", response)
                
            })
            .catch(error => {
                const {response} = error
                var messages = ""
                if(response.status == 422){
                   messages = Object.keys(response.data.errors).map(fieldName => response.data.errors[fieldName].join(', ')).join(', ')
                }else{
                     messages = "Server Error"
                    console.log('ERROR RESPONSE => ', response)
                    console.log('ERROR OBJECT => ', error)
                }
                dispatch(loginError(messages))
                // if(response.LOGIN_FAILURE )
            })
    }
  }

  export function logoutUser() {
    return dispatch => {
      dispatch(requestLogout())
      localStorage.removeItem('id_token')
      localStorage.removeItem('access_token')
      dispatch(receiveLogout())
    }
  }

  