import * as types from '../constants/ActionTypes' 

const initialstate = {
    modal_open: false, 
    login_card_open: false 
}

export default function modal(state=initialstate, action){
  
  switch(action.type) {
    case types.MODAL_OPEN: 
      return Object.assign({}, state, {
          modal_open: true  
      }); 
    case types.MODAL_CLOSE: 
      return Object.assign({}, state, {
          modal_open: false  
      }); 
    case types.LOGIN_CARD_OPEN: 
      return Object.assign({}, state, {
          login_card_open: true 
      }); 
    case types.LOGIN_CARD_CLOSE:
      return Object.assign({}, state, {
          login_card_open: false 
      }); 
    default: 
      return state; 
    }
}
