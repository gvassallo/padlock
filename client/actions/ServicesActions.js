import * as types from '../constants/ActionTypes.js' 
import ServicesService from '../services/ServicesService' 

export function download() {
    return dispatch => {
        ServicesService.download()
            .then(data => {
                dispatch(receiveServicesList(data.services)); 
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



