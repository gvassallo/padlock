import {combineReducers} from 'redux'
import auth from './auth' 
import logins from './logins' 
import profile from './profile' 
import options from './options' 
import groups from './groups' 

const rootReducer = combineReducers({
  auth , 
  logins, 
  profile, 
  groups, 
  options
}); 

export default rootReducer; 
