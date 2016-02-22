import * as types from '../constants/ActionTypes'

export function modalOpen(){
  return {
      type: types.MODAL_OPEN
  }; 
}

export function modalClose(){
  return {
      type: types.MODAL_CLOSE
  }; 
}

export function loginCardOpen(){
  return {
      type: types.LOGIN_CARD_OPEN
  }; 
}

export function loginCardClose(){
  return {
      type: types.LOGIN_CARD_CLOSE
  }; 
}
