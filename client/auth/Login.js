import React from 'react'; 

import { Input, ButtonInput } from 'react-bootstrap'; 
import { connect } from 'react-redux'; 
import AuthActions from '../actions/AuthActions'
import * as AuthAction  from '../actions/AuthActions'; 
import BaseForm from './BaseForm'

class Login extends React.Component {
    constructor(){
        super(); 
        this.state = {
            username: '', 
            password: ''
        }; 
    }

    handleChange(field){ 
        return (event) => {
            this.state[field] = event.target.value; 
            this.setState(this.state); 
        }; 
    }
        
    login(event) {
        const { dispatch } = this.props;  
        event.preventDefault(); 
        dispatch(AuthAction.login(this.state)); 
    }

    render() {
        return (
        <BaseForm> 
        <form onSubmit={this.login.bind(this)} action=''> 
            <Input type="text" onChange={this.handleChange('username')} placeholder="Enter name" />
            <Input type="password" onChange={this.handleChange('password')} placeholder="Enter password" />
            <ButtonInput type="submit" value="Login" block/> 
        </form> 
        </BaseForm> 
        ); 
    }
}; 

export default connect()(Login);  
