import * as types from '../constants/ActionTypes'
import AuthService from '../services/AuthService'
import history from '../history' 

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
        AuthService.login(user)
            .then((data) => {
                dispatch(receiveAuthedUserAndToken(data.user, data.token));
                history.pushState(null, '/')
            })
            .catch( e=>{ console.log(e.message)});
    } 
}


export function register(user) {
    return dispatch => {
        AuthService.register(user)
            .then((data) => {
                dispatch(receiveAuthedUserAndToken(data.user, data.token));
                history.pushState(null, '/')
            })
            .catch( e=>{console.log(e.message)});
    } 
} 

export function auth(user, token) {
    return dispatch => {
        dispatch(receiveAuthedUserAndToken(user, token)); 
    }; 
}

export function logout() {
    AuthService.logout(); 
    console.log("logout"); 
    return {    
        type: types.RESET_USER_AND_TOKEN
    };
}


function  loginFailed(data) {
        return{
            type: types.LOGIN_FAILED,
            data 
        }
    };

