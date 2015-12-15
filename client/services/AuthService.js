'use strict'; 

import axios from 'axios'; 

class AuthService { 

  register(user) {
    return axios
      .post('/api/auth/register', user)
      .then(res => {
        if (res.status === 200) {
          this.auth(res.data.user, res.data.token);
          console.log("oook"); 
          return Promise.resolve(res.data);
        }
        throw Error(res.message);
      });
  }
}; 

export default new AuthService; 


// login(user) {
//     return axios
//       .post('/api/auth', user)
//       .then(res => {
//         if (res.status === 200) {
//           this.auth(res.data.user, res.data.token);
//           return Promise.resolve(res.data);
//         }
//         throw Error(res.message);
//       });
// }
