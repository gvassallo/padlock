import * as types from '../constants/ActionTypes' 

const initialstate = {
  list: [], 
  password: ''
}

export default function logins(state = initialstate, action ) {

  switch(action.type) {

    case types.RECEIVE_LOGINS_LIST: 
      return Object.assign({}, state, {
        list: [...action.logins] 
      }); 

    case types.RECEIVE_NEW_LOGIN: 
      return Object.assign({}, state, {
        list: [
          ...state.list, action.login
        ]
      }); 

    case types.RESET_LOGINS_LIST: 
      return Object.assign({}, state, {list:[]}); 

    case types.DELETE_LOGIN: 
      var index = state.list.findIndex(elem => action.login.uuid === elem.uuid) ; 
      state.list.splice(index, 1); 
      return state;  

    case types.UPDATE_LOGIN: 
      var index = state.list.findIndex(elem => action.login.uuid === elem.uuid) ; 
      state.list[index] = action.login; 
      return state;  

    case types.RECEIVE_PASSWORD: 
      return Object.assign({}, state, 
        {password: action.password});

    default :
      return state; 
  }
}
