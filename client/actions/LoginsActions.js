import * as types from '../constants/ActionTypes.js' 
import LoginsService from '../services/LoginsService' 

export function download() {
    return dispatch => {
        LoginsService.download()
            .then(data => {
                if(data.length > 0) 
                dispatch(receiveLoginsList(data)); 
            })
            .catch( e=> {console.log(e.message)}); 
        }
}

export function addNew(login){
    return dispatch => {
        LoginsService.addNew(login)
            .then(data => {
                dispatch(receiveNewLogin(data));  
            })
            .catch( e=> {console.log(e.message)}); 
    }
}

function receiveLoginsList(logins){
    return {
        type: types.RECEIVE_LOGINS_LIST, 
        logins 
    }; 
}

function receiveNewLogin(login) {
    return {
        type: types.RECEIVE_NEW_LOGIN, 
        login 
    }; 
}


