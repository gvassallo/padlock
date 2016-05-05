import * as types from '../constants/ActionTypes'
import AuthService from '../services/AuthService'
import {browserHistory} from 'react-router'

function receiveAccessToken(token) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    token 
  };
}

function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user
  };
}

function receiveAuthedUserAndToken(user, token) {
  return dispatch => {
    dispatch(receiveAuthedUser(user));
    dispatch(receiveAccessToken(token)); 
  }; 
}

export function login(user) {
  return dispatch => {
    return AuthService.login(user)
      .then((data) =>{
        return dispatch(receiveAuthedUserAndToken(data.user, data.token));
      })
    .then(()=>{
      browserHistory.push('/');
    })
  } 
}


export function register(user) {
  return dispatch => {
    return AuthService.register(user)
      .then((data) => {
        return dispatch(receiveAuthedUserAndToken(data.user, data.token));
      })
    .then(()=>{
      browserHistory.push('/');
    })
  } 
} 

export function auth(user, token) {
  return dispatch => {
    dispatch(receiveAuthedUserAndToken(user, token)); 
  }; 
}

export function logout() {
  AuthService.logout(); 
  browserHistory.push('/login'); 
  return {    
    type: types.RESET_USER_AND_TOKEN
  };
}


function loginFailed(data) {
  return{
    type: types.LOGIN_FAILED,
    data 
  }
};

