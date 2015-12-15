import React from 'react'; 

import { Input, ButtonInput, Button } from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap';

// import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          username: '',
          fullname: ''
        };
        // this.onChange = this.onChange.bind(this);
    }

    handleChange(field) {
      return (event) => {
        this.state[field] = event.target.value;
        this.setState(this.state);
      };
    }

    register(event) {
      event.preventDefault();
      AuthActions.register(this.state);
    }
  
    // componentWillMount() {
    //   AuthStore.listen(this.onChange);
    // }
    //
    // componentWillUnmount() {
    //   AuthStore.unlisten(this.onChange);
    // }

    render() {
        return (
        <div> 
            <form onSubmit={this.register.bind(this)} action=''>
              <Input type='text' onChange={this.handleChange('username')} placeholder='Username' />
              <Input type='email' onChange={this.handleChange('email')} placeholder='Email' />
              <Input type='password' onChange={this.handleChange('password')} placeholder='Password' />
              <Input type='text' onChange={this.handleChange('fullname')} placeholder='Full Name' />
              <ButtonInput type='submit' value='Register' block />
            </form>
            <div className='pt-lg text-center'>
              <p>Already have an account?</p>
              <LinkContainer to='/login'>
                <Button bsStyle='primary' block>Login</Button>
              </LinkContainer>
            </div>
          </div> 
        ); 
    }
}; 
