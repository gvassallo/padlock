'use strict'; 

import axios from 'axios' 

class GroupsService {

  downloadGroups(){
    return axios
      .get('/api/groups')
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  createGroup(name){
    var group = {
      name: name
    }; 
    return axios
      .post('/api/groups', group)
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  addMemberToGroup(group, email){
    var master = sessionStorage.getItem('master'); 
    return axios
      .put('/api/groups/'+group.uuid+'/members', {user : {email: email}, master: master})
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  getMembers(group){
    return axios
      .get('/api/groups/'+group.uuid+'/members')
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  getLoginsFromGroup(group){
    return axios
      .get('/api/groups/'+group.uuid+'/logins')
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  addLoginToGroup(group, login){
    return axios
      .post('/api/groups/'+group.uuid+'/logins', {login: login})
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  getPassword(group, login){
    var master = sessionStorage.getItem('master'); 
    return axios
      .post('/api/groups/'+group.uuid+'/logins/'+ login.uuid, {master: master})
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data.password); 
        }
        throw new Error(res.message); 
      }); 
  }

  updateLoginToGroup(group, login){
    return axios
      .put('/api/groups/'+group.uuid+'/logins/'+login.uuid, {login: login})
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  deleteLoginFromGroup(group, login){
    return axios
      .delete('/api/groups/'+group.uuid+'/logins/'+ login.uuid)
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  deleteMemberFromGroup(group, member){
    return axios
      .delete('/api/groups/'+group.uuid+'/members/'+member.uuid)
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data);
        }
        throw new Error(res.message);
      });
  }
  
  deleteGroup(group){
    return axios
      .delete('/api/groups/'+group.uuid)
      .then(res => {
        if(res.status === 200){
          return Promise.resolve(res.data);
        }
        throw new Error(res.message);
      });
  }
}

export default new GroupsService(); 
