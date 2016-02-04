import * as types from '../constants/ActionTypes.js' 
import ServicesService from '../services/ServicesService' 

export function download() {
    return dispatch => {
        ServicesService.download()
            .then(data => {
            console.log(data); 
                if(data.length > 0) 
                dispatch(receiveServicesList(data)); 
            })
            .catch( e=> {console.log(e.message)}); 
        }
}

export function addNew(service){
    return dispatch => {
        ServicesService.addNew(service)
            .then(data => {
                dispatch(receiveNewService(data));  
            })
            .catch( e=> {console.log(e.message)}); 
    }
}

function receiveServicesList(services){
    return {
        type: types.RECEIVE_SERVICES_LIST, 
        services 
    }; 
}

function receiveNewService(service) {
    return {
        type: types.RECEIVE_NEW_SERVICE, 
        service 
    }; 
}


