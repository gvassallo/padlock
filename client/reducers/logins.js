import * as types from '../constants/ActionTypes' 

const initialstate = {
    list: [] 
}

export default function logins(state = initialstate, action ) {

    switch(action.type) {

    case types.RECEIVE_LOGINS_LIST: 
        return Object.assign({}, state, {
            list: [...action.logins] 
        }); 

    case types.RECEIVE_NEW_LOGIN: 
        return Object.assign({}, state, {
            list: [
                ...state.list, action.login
            ]
        }); 
    default :
        return state; 
    }
}
