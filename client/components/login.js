import React from 'react'; 

import { Input, ButtonInput } from 'react-bootstrap'; 

import AuthActions from '../actions/AuthActions'
import AuthStore from '../stores/AuthStore'; 

export default class Login extends React.Component {
    constructor(){
        super(); 
        this.state = {
            username: '', 
            password: ''
        }; 
        this.onChange = this.onChange.bind(this); 
    }

    handleChange(field){ 
        return (event) => {
            this.state[field] = event.target.value; 
            this.setState(this.state); 
        }; 
    }
        
    login(event) {
        event.preventDefault(); 
        AuthActions.login(this.state); 
    }

    componentWillMount() {
      AuthStore.listen(this.onChange);
    }

    componentWillUnmount() {
      AuthStore.unlisten(this.onChange);
    }

    onChange() {
      this.state.loading = AuthStore.getState().loading;
      this.setState(this.state);
    }
    render() {
        return (
        <form onSubmit={this.login.bind(this)} action=''> 
            <Input type="text" onChange={this.handleChange('username')} placeholder="Enter name" />
            <Input type="password" onChange={this.handleChange('password')} placeholder="Enter password" />
            <ButtonInput type="submit" value="Login" block/> 
        </form> 
        ); 
    }
}; 
