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
