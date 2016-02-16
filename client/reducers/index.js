import {combineReducers} from 'redux';
import auth from './auth'; 
import logins from './logins'; 
import profile from './profile'; 
import modal from './modal'; 

const rootReducer = combineReducers({
    auth , 
    logins, 
    profile, 
    modal
}); 

export default rootReducer; 
