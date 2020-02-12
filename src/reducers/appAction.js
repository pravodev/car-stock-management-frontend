export  const ERROR_MESSAGE = 'ERROR_MESSAGE'

export const setErrorMessage = (message) => {
    if(typeof message == 'object'){
        message = Object.keys(message).map(key => message[key].join(', ')).join(', ')
    }
    return {
        type: ERROR_MESSAGE,
        errorMessage: message
      }
}