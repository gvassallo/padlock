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
          alertShow: false, 
          loading: false
        };
    }

    handleChange(field) {
      return (event) => {
        this.state[field] = event.target.value;
        this.setState(this.state);
      };
    }

    register(event) {
      this.state.loading = true; 
      this.setState(this.state); 
      const { dispatch } = this.props; 
      event.preventDefault();
      dispatch(AuthActions.register(this.state)) 
      .catch((err)=>{
        this.state.loading = false; 
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
        <div className="register-form">
          <BaseForm>  
            <div className='panel-heading panel-heading-dark'>
              <span style={{color: 'white', fontSize: '16px'}}>Register</span>
            </div>
            <div className='panel-body'>
            <form onSubmit={this.register.bind(this)} action='' autoComplete='off'>
              <Row> 
                <Col sm={4} md={4}>
                  <label>Username</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type='text' onChange={this.handleChange('username')}/>
                </Col>
              </Row> 
              <Row> 
                <Col sm={4} md={4}>
                  <label>Email</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type='text' onChange={this.handleChange('email')}/>
                </Col>
              </Row> 
              <Row> 
                <Col sm={4} md={4}>
                  <label>Password</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type='password' onChange={this.handleChange('password')}/>
                </Col>
              </Row> 
              <Row> 
                <Col sm={4} md={4}>
                  <label>Full Name</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type='text' onChange={this.handleChange('fullname')}/>
                </Col>
              </Row> 
              {this.state.loading?(
              <ButtonInput type='submit' value='Wait' disabled/>
              ):(
              <ButtonInput type='submit' value='Register' block />
              )} 
            </form>
            <div className='pt-lg text-center'>
              <p>Already have an account?</p>
              <LinkContainer to='/login'>
                <Button bsStyle='primary' block>Login</Button>
              </LinkContainer>
            </div>
            </div> 
          </BaseForm> 
          {this.showAlert()}
        </div>
        ); 
    }
} 

export default connect()(Register); 
// vim: set ft=javascript.jsx: 
