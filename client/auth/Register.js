import React from 'react' 
import { Input, ButtonInput, Button, Row, Col, Alert } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'
import * as AuthActions from '../actions/AuthActions' 
import { connect } from 'react-redux' 
import BaseForm from './BaseForm' 

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          username: '',
          fullname: '', 
          alertShow: false
        };
    }

    handleChange(field) {
      return (event) => {
        this.state[field] = event.target.value;
        this.setState(this.state);
      };
    }

    register(event) {
      const { dispatch } = this.props; 
      event.preventDefault();
      dispatch(AuthActions.register(this.state)) 
      .catch(e=>{
        this.state.alertShow = true; 
        this.setState(this.state); 
       }); 
    }
  
    showAlert(){
      if(this.state.alertShow){
        return (
          <Row> 
            <Col sm={6} smOffset={3} md={4} mdOffset={4}>
              <Alert bsStyle="danger"> 
                <center>
                  <h4>Holy shit!</h4>
                  <p>Username/Email or Password are wrong, idiot!</p>
                </center>
              </Alert> 
            </Col>
          </Row>);
      }
    }

    render() {
        return (
        <div>
          <BaseForm>  
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
          </BaseForm> 
          {this.showAlert()}
        </div>
        ); 
    }
}; 

export default connect()(Register); 
