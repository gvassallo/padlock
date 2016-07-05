'use strict' 

import axios from 'axios' 

class ProfileService {

  getUserInfo(){
    return axios
      .get('api/users/me')
      .then(res => {
        if(res.status === 200) {
          return Promise.resolve(res.data);
        } 
        throw Error(res.message); 
      });
  } 
}

export default new ProfileService(); 
