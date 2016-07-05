'use strict';

import axios from 'axios';

class AuthService {
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

  login(user) {
    return axios
      .post('/api/auth', user)
      .then(res => {
        if (res.status === 200) {
          this.auth(res.data.user, res.data.token, user.password);
          return Promise.resolve(res.data);
        }
        throw new Error(res.message);
      });
  }

  register(user) {
    return axios
      .post('/api/auth/register', user)
      .then(res => {
        if (res.status === 200) {
          this.auth(res.data.user, res.data.token, user.password);
          return Promise.resolve(res.data);
        }
        throw new Error(res.message);
      });
  }

  auth(user, token, master) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('master', master); 
    this.user = user;
    this.token = token;
    this.master = master; 
  }

  isLoggedIn() {
    if (this.user && this.token) {
      return true;
    }
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.token = sessionStorage.getItem('token');
      this.master = sessionStorage.getItem('master'); 
      return this.user && this.token;
    } catch (e) {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('master'); 
    this.user = null;
    this.token = null;
    this.master = null; 
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

  getMaster(){
    return this.master; 
  }
}

export default new AuthService();
