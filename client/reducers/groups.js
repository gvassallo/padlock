import {List, Map} from 'immutable' 
import * as types from '../constants/ActionTypes' 

const initialstate = Map({});

export default function groups(state = initialstate,  action){

  switch(action.type) {

    case types.RECEIVE_GROUPS_LIST: 
      action.groups.forEach(group => { 
        group.logins= Map({});
        group.members = Map({});
        state = state.set(group.uuid, group);
      });
      return state;

    case types.NEW_GROUP_CREATED: 
      action.group.logins = Map({});
      action.group.members = Map({});
      //workaround 
      action.group.UserGroup = new Object();
      action.group.UserGroup.admin = true;
      return state.set(action.group.uuid, action.group);

    case types.RECEIVE_MEMBERS:
      var members = Map({});
      action.members.forEach(member => {
        members = members.set(member.uuid, member);
      });
      return state
        .update(action.group.uuid, value => 
            Object.assign({}, value, {
              members: members
            })
        );

    case types.RECEIVE_NEW_MEMBER: 
      return state
        .update(action.group.uuid, value => 
          Object.assign({}, value, {
            members: value.members.set(action.member.uuid, action.member)
          })
        );

    case types.RECEIVE_LOGINS_FROM_GROUP: 
      var logins = Map({});
      action.logins.forEach(login => 
        logins = logins.set(login.uuid, login)
      );
      return state
        .update(action.group.uuid, value => 
          Object.assign({}, value, {
            logins: logins
          })
        );

    case  types.RECEIVE_NEW_LOGIN_FOR_GROUP || 
          types.RECEIVE_UPDATED_LOGIN_FOR_GROUP || 
          types.RECEIVE_PASSWORD_FROM_GROUP: 
      return state
        .update(action.group.uuid, value => 
          Object.assign({}, value, {
            logins: value.logins.set(action.login.uuid, action.login)
          })
        );

    case types.DELETE_LOGIN_FROM_GROUP: 
      return state
        .update(action.group.uuid, value => 
          Object.assign({}, value, {
            logins: value.logins.delete(action.login.uuid)         
          })
        );

    case types.REMOVE_GROUP:
      return state.delete(action.group.uuid);

    case types.LEAVE_GROUP: 
      return state.delete(action.group.uuid);

    case types.REMOVE_MEMBER_FROM_GROUP: 
      return state
        .update(action.group.uuid, value =>
          Object.assign({}, value, {
            members: value.members.delete(action.member.uuid)
          })
        );

    default: 
      return state; 
  }
}
