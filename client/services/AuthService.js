'use strict'; 

import axios from 'axios'; 


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
class AuthService { 

login(){
    return axios
           .get('/api/users')
           .then(function(response) {
             console.log(response.data);
             console.log(response.status);
             console.log(response.statusText);
             console.log(response.headers);
             console.log(response.config);
    });
}

export default new AuthService; 
