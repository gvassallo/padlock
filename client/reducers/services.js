import * as types from '../constants/ActionTypes' 

const initialstate = {
    list: [] 
}

export default function services(state = initialstate, action ) {

    switch(action.type) {

    case types.RECEIVE_SERVICES_LIST: 
        return Object.assign({}, state, {
            list: [...state.list, ...action.services] 
        }); 

    case types.RECEIVE_NEW_SERVICE: 
        return Object.assign({}, state, {
            list: [
                ...state.list, action.service
            ]
        }); 
    default :
        return state; 
    }
}
