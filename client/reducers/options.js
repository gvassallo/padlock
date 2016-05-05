import * as types from '../constants/ActionTypes' 

const initialstate = {
  modal_open: false, 
  login_card_open: false, 
  dropdown_open: false, 
  current_view: 'Logins', 
  loading: false, 
  snackbarOpen: true, 
  message: 'Welcome back!'
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
    case types.DROPDOWN_OPEN: 
      return Object.assign({}, state, {
        dropdown_open: true 
      }); 
    case types.DROPDOWN_CLOSE:
      return Object.assign({}, state, {
        dropdown_open: false 
      }); 
    case types.VIEW_CHANGED: 
      return Object.assign({}, state, {
        current_view: action.view 
      }); 
    case types.LOADING: 
      return Object.assign({}, state, {
        loading: true 
      }); 
    case types.LOADING_END: 
      return Object.assign({}, state, {
        loading: false 
      }); 
    case types.SNACK_BAR_OPEN: 
      return Object.assign({}, state, {
        snackbarOpen: true, 
        message: action.message
      }); 
    case types.SNACK_BAR_CLOSE: 
      return Object.assign({}, state, {
        snackbarOpen: false 
      }); 
    default: 
      return state; 
  }
}
