import * as types from '../constants/ActionTypes.js' 
import LoginsService from '../services/LoginsService' 

export function download() {
  return dispatch => {
    return LoginsService.download()
      .then(data => {
        if(data.length > 0) 
          return dispatch(receiveLoginsList(data)); 
      })
  }
}

export function addNew(login){
  return dispatch => {
    return LoginsService.addNew(login)
      .then(data => {
        return dispatch(receiveNewLogin(data));  
      }); 
  }
}

export function deleteLogin(login){
  return dispatch => {
    return LoginsService.delete(login)
      .then(() => {
        dispatch(removeLogin(login)); 
      }) 
    .catch( e=> {console.log(e.message)}); 
  }
}

export function updateLogin(login){
  return dispatch => {
    return LoginsService.update(login)
      .then((login) => {
          dispatch(update(login)); 
      }) 
    .catch( e=> {console.log(e.message)}); 
  }
}

export function resetLoginsList(){
  return {
    type: types.RESET_LOGINS_LIST 
  };
}

function receiveLoginsList(logins){
  return {
    type: types.RECEIVE_LOGINS_LIST, 
    logins 
  }; 
}

function receiveNewLogin(login) {
  return {
    type: types.RECEIVE_NEW_LOGIN, 
    login 
  }; 
}

function removeLogin(login){
  return {
    type: types.DELETE_LOGIN, 
    login 
  }; 
}

function update(login){
  return {
    type: types.UPDATE_LOGIN, 
    login 
  }; 
}
