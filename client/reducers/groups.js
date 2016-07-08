import * as types from '../constants/ActionTypes' 

const initialstate = {
  list: [] 
}

export default function groups(state = initialstate,  action){

  switch(action.type) {

    case types.RECEIVE_GROUPS_LIST: 
      action.groups.forEach(group => {group.logins=[]});
      return Object.assign({}, state, {
        list :  [...action.groups]
      }); 

    case types.NEW_GROUP_CREATED: 
      action.group.logins = [];  
      return Object.assign({}, state, {
        list: [
          ...state.list, action.group
        ]
    }); 

    case types.RECEIVE_MEMBERS:
      var index = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      state.list[index].members = action.members;       
      return Object.assign({}, state, {
        list: [...state.list]
      });

    case types.RECEIVE_NEW_MEMBER: 
      var index = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      if(state.list[index].members === undefined) 
        state.list[index].members = new Array(); 
      state.list[index].members.push(action.member);  
      return Object.assign({}, state, {
        list: [...state.list]
      });

    case types.RECEIVE_NEW_LOGIN_FOR_GROUP: 
      var index = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      state.list[index].logins.push(action.login);
      return Object.assign({}, state, {
        list: [...state.list]
      });

    case types.RECEIVE_LOGINS_FROM_GROUP: 
      var index = state.list
        .findIndex(elem => action.group.uuid === elem.uuid); 
      state.list[index].logins = action.logins; 
      return Object.assign({}, state, {
        list: [...state.list]
      });

    case types.RECEIVE_UPDATED_LOGIN_FOR_GROUP: 
      var gindex = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      var lindex = state.list[gindex].logins
        .findIndex(elem => action.login.uuid === elem.uuid) ; 
      state.list[gindex].logins[lindex] = action.login; 
      return Object.assign({}, state); 

    case types.RECEIVE_PASSWORD_FROM_GROUP: 
      var gindex = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      var lindex = state.list[gindex].logins
        .findIndex(elem => action.login.uuid === elem.uuid) ; 
      state.list[gindex].logins[lindex] = action.login; 
      return Object.assign({}, state); 

    case types.DELETE_LOGIN_FROM_GROUP: 
      var gindex = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      var lindex = state.list[gindex].logins
        .findIndex(elem => action.login.uuid === elem.uuid) ; 
      state.list[gindex].logins.splice(index, 1); 
      return Object.assign({}, state); 

    case types.REMOVE_GROUP: 
      var gindex = state.list
        .findIndex(elem => action.group.uuid === elem.uuid) ; 
      state.list.splice(gindex, 1);
      return Object.assign({}, state, {
        list: [...state.list]
      });

    default: 
      return state; 
  }
}
