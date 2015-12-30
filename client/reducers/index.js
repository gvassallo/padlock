import {combineReducers} from 'redux';
import auth from './auth'; 
import services from './services'; 

const rootReducer = combineReducers({
    auth , 
    services
}); 

export default rootReducer; 
