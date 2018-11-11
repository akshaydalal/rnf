import {combineReducers} from 'redux';
import addUserReducer from './addUserReducer'

export default combineReducers({
    addUser:addUserReducer
})