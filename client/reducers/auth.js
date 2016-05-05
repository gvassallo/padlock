import * as types from '../constants/ActionTypes.js'; 

const initialstate = {
  user: null,
  token: null 
}

export default function auth(state = initialstate, action) {
  switch(action.type) {
    case types.RECEIVE_AUTHED_USER: 
      return Object.assign({}, state, {
        user: action.user 
      }); 
    case types.RECEIVE_ACCESS_TOKEN: 
      return Object.assign({}, state, {
        token: action.token 
      }); 
    case types.RESET_USER_AND_TOKEN:
      return Object.assign({}, state, {
        user: null,
        token: null 
      }); 
    default: 
      return state; 
  }
}
