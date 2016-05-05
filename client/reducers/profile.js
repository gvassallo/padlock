import * as types from '../constants/ActionTypes'  

const initialstate = {
  username: null, 
  fullName: null, 
  email: null, 
  createdAt: null 

}

export default function profile(state = initialstate, action) {

  switch(action.type) {

    case types.RECEIVE_USER_INFO: 
      return Object.assign({}, state, {
        username: action.profile.username, 
        fullName: action.profile.fullName, 
        email: action.profile.email, 
        createdAt: action.profile.createdAt 
      }); 
    default: 
      return state; 
  } 
}
