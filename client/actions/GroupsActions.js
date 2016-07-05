import * as types from '../constants/ActionTypes' 
import GroupsService from '../services/GroupsService' 

export function downloadGroups(){
  return dispatch => {
    return GroupsService.downloadGroups()
      .then(data => {
        return dispatch(receiveGroupsList(data)); 
      }); 
  }; 
}

export function createGroup(name){
  return dispatch => {
    return GroupsService.createGroup(name)
      .then(data => {
        return dispatch(newGroup(data));
      }); 
  }; 
}

export function getMembers(group){
  return dispatch => {
    return GroupsService.getMembers(group)
      .then(data => {
        return dispatch(receiveMembers(group, data)); 
      })
  }
}

export function addMemberToGroup(group, email){
  return dispatch => {
    return GroupsService.addMemberToGroup(group, email)
      .then(() => {
        //TODO check if it's correct 
        return dispatch(this.getMembers(group)); 
      }); 
  }; 
}

export function getLoginsFromGroup(group){
  return dispatch => {
    return GroupsService.getLoginsFromGroup(group)
      .then(data => {
        return dispatch(receiveLoginFromGroup(group, data));
      }); 
  }; 
}

export function addNewLoginToGroup(group, login){
  return dispatch => {
    return GroupsService.addLoginToGroup(group, login)
      .then(data => {
        return dispatch(receiveNewLoginForGroup(group, data)); 
      }); 
  }; 
}

export function deleteLoginFromGroup(group, login){
  return dispatch => {
    return GroupsService.deleteLoginFromGroup(group, login)
      .then(() => {
        return dispatch(removeLoginFromGroup(group, login));   
      }); 
  }; 
}

export function updateLoginToGroup(group, login){
  return dispatch => {
    return GroupsService.updateLoginToGroup(group, login)
      .then((data) => {
        return dispatch(receiveUpdatedLoginForGroup(group, data));  
      }); 
  }; 
}

// do not query again if the password is already uncrypted 
export function getPassword(group, login){
  var base64regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;  
  if(base64regex.test(login.password)){
    return dispatch => {
      return GroupsService.getPassword(group, login)
        .then((password) => {
          login.password = password;  
          return dispatch(receivePasswordFromGroup(group, login));  
        }); 
    }; 
  }else{
    return dispatch(receivePasswordFromGroup(group, login)); 
  }
}

export function deleteGroup(group){
  return dispatch => {
    return GroupsService.deleteGroup(group)
      .then((group) => {
        return dispatch(removeGroup(group));
      });
  };
}

function receiveGroupsList(data){
  return {
    type: types.RECEIVE_GROUPS_LIST, 
    groups: data  
  }; 
}

function newGroup(group){
  return {
    type: types.NEW_GROUP_CREATED, 
    group  
  }; 
}

function receiveMembers(group, members){
  return {
    type: types.RECEIVE_MEMBERS, 
    group, 
    members 
  }
}

function receiveNewMember(){
  return {
    type: types.RECEIVE_NEW_MEMBER 
  }; 
}

function receiveLoginFromGroup(group, logins){
  return {
    type: types.RECEIVE_LOGINS_FROM_GROUP, 
    group, 
    logins 
  }; 
}

function receiveNewLoginForGroup(group, login){
  return {
    type: types.RECEIVE_NEW_LOGIN_FOR_GROUP, 
    group, 
    login
  }; 
}

function removeLoginFromGroup(group, login){
  return {
    type: types.DELETE_LOGIN_FROM_GROUP, 
    group, 
    login 
  }; 
}

function receiveUpdatedLoginForGroup(group, login){
  return {
    type: types.RECEIVE_UPDATED_LOGIN_FOR_GROUP,
    group, 
    login 
  }; 
}

function receivePasswordFromGroup(group, login){
  return {
    type: types.RECEIVE_PASSWORD_FROM_GROUP, 
    group, 
    login 
  }; 
}

function removeGroup(group){
  return {
    type: types.REMOVE_GROUP, 
    group
  };
}

