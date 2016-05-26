'use strict'; 

import axios from 'axios' 

class LoginsService {
  // constructor() {
  //   this.token = localStorage.getItem('token'); 
  //   axios.interceptors.request.use(config => {
  //     config.headers['x-access-token'] = this.token;
  //     return config;
  //   }, error => {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   });
  //   // Add a response interceptor
  //   axios.interceptors.response.use(response => {
  //     return response;
  //   }, error => {
  //     if (error.statusCode === 503) {
  //       this.logout();
  //     }
  //     return Promise.reject(error);
  //   });
  // }

  download(){
    return axios 
      .get('/api/logins')
      .then(res => {
        if(res.status === 200) {
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  addNew(login){
    var master = sessionStorage.getItem('master');
    return axios 
      .post('/api/logins', {login: login, master: master})
      .then(res => {
        if(res.status === 200) {
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  delete(login){
    return axios 
      .delete('/api/logins/' + login.uuid)
      .then(res => {
        if(res.status === 200) {
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  update(login){
    var master = sessionStorage.getItem('master'); 
    return axios
      .put('/api/logins/'+login.uuid,{login: login, master: master} )
      .then(res => {
        if(res.status === 200) {
          return Promise.resolve(res.data); 
        }
        throw new Error(res.message); 
      }); 
  }

  getPassword(login){
    var master = sessionStorage.getItem('master'); 
    return axios
      .post('/api/logins/' + login.uuid, {master: master}) 
      .then(res=> {
        if(res.status ===200) {
          return Promise.resolve(res.data.password);  
        } 
        throw new Error(res.message); 
      }); 
  }
}

export default new LoginsService(); 

