'use strict' 

import axios from 'axios' 

class Axios {
    constructor() { 
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
}

export default Axios; 
