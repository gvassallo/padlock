import * as types from '../constants/ActionTypes' 
import ProfileService from '../services/ProfileService' 

export function getUserInfo() {
    return dispatch => {
      ProfileService.getUserInfo() 
        .then((data) => {
          dispatch(receiveUserInfo(data))
      })
      .catch( e=> {console.log(e.message)}); 
    }
}

function receiveUserInfo(profile){
    return {
      type: types.RECEIVE_USER_INFO, 
      profile 
    }; 
}
