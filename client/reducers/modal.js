import * as types from '../constants/ActionTypes' 

const initialstate = {
    open: false 
}

export default function modal(state=initialstate, action){
  
  switch(action.type) {
    case types.MODAL_OPEN: 
      return {
        open: true
      }; 
    case types.MODAL_CLOSE: 
      return {
        open: false 
      }; 
    default: 
      return state; 
    }
}
