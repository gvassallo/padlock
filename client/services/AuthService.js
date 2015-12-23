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
          this.auth(res.data.user, res.data.token);
          return Promise.resolve(res.data);
        }
        throw Error(res.message);
      });
  }

  register(user) {
    return axios
      .post('/api/auth/register', user)
      .then(res => {
        if (res.status === 200) {
          this.auth(res.data.user, res.data.token);
          return Promise.resolve(res.data);
        }
        throw Error(res.message);
      });
  }

  auth(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token;
  }

  isLoggedIn() {
    if (this.user && this.token) {
      return true;
    }
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
      return this.user && this.token;
    } catch (e) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
    this.token = null;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}

export default new AuthService();
