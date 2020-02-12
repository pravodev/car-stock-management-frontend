import { combineReducers } from 'redux';
import auth from './authReducer'
import app from './appReducer'

const reducers = {
    auth,
    app
}
const appReducers = combineReducers(reducers)
export default appReducers