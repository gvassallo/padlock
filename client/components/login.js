import React from 'react'; 

import { Input, ButtonInput } from 'react-bootstrap'; 


export default class Login extends React.Component {
    render() {
        return (
        <form> 
            <Input type="text" label="name" placeholder="Enter name" />
            <Input type="email" label="email" placeholder="Enter email" />        
            <Input type="password" label="password" placeholder="Enter password"/> 
            <ButtonInput type="submit" value="login" block/> 
        </form> 
        ); 
    }
}; 
