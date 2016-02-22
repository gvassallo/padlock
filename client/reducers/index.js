import {combineReducers} from 'redux'
import auth from './auth' 
import logins from './logins' 
import profile from './profile' 
import options from './options' 

const rootReducer = combineReducers({
    auth , 
    logins, 
    profile, 
    options
}); 

export default rootReducer; 
