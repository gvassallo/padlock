'use strict' 

import axios from 'axios' 

class ProfileService {

  constructor() {
    this.token = localStorage.getItem('token'); 
    axios.interceptors.request.use(config => {
      config.headers['x-access-token'] = this.token;
      return config;
    }, error => {
      // Do something with request error
      return Promise.reject(error);
    });
    // Add a response interceptor
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.statusCode === 503) {
        this.logout();
      }
      return Promise.reject(error);
    });
  }

  getUserInfo(){
    return axios
        .get('api/users/me')
        .then(res => {
          if(res.status === 200) {
            return Promise.resolve(res.data);
          } 
          throw Error(res.message); 
        });
  } 
}

export default new ProfileService(); 
