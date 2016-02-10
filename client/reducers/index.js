import {combineReducers} from 'redux';
import auth from './auth'; 
import logins from './logins'; 
import profile from './profile'; 

const rootReducer = combineReducers({
    auth , 
    logins, 
    profile
}); 

export default rootReducer; 
