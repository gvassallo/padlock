import * as types from '../constants/ActionTypes' 

const initialstate = {
    list: [{name: 'troia'}, {name: 'madonna'}] 
}

export default function services(state = initialstate, action ) {

    switch(action.type) {

    case types.RECEIVE_SERVICES_LIST: 
        return Object.assign({}, state, {
            list: action.services  
        }); 
    default :
        return state; 
    }
}
