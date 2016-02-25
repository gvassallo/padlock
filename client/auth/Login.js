import React from 'react'; 

import { Input, ButtonInput, Button, Alert, Row, Col } from 'react-bootstrap'; 
import {LinkContainer} from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
import AuthActions from '../actions/AuthActions'
import * as AuthAction  from '../actions/AuthActions'; 
import BaseForm from './BaseForm'

class Login extends React.Component {
    constructor(){
        super(); 
        this.state = {
            username: '', 
            password: '', 
            alertShow: false, 
            loading: false
        }; 
    }

    handleChange(field){ 
        return (event) => {
            this.state[field] = event.target.value; 
            this.setState(this.state); 
        }; 
    }
        
    login(event) {
        this.state.loading = true; 
        this.setState(this.state); 
        const { dispatch } = this.props;  
        event.preventDefault(); 
        dispatch(AuthAction.login(this.state))
        .catch(e=>{
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
        <div className="login-form">
          <BaseForm> 
          <form onSubmit={this.login.bind(this)} action=''> 
            <section>
              <Row>
                <Col sm={4} md={4}>
                  <label>Username</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type="text" onChange={this.handleChange('username')} placeholder="Enter name" />
                </Col>
              </Row>
            </section> 
            <section>
              <Row>
                <Col sm={4} md={4}>
                  <label>Password</label>
                </Col>
                <Col sm={8} md={8}>
                  <Input type="password" onChange={this.handleChange('password')} placeholder="Enter password" />
                </Col>
              </Row>
            </section>
            <hr/>
            <section>
              <Row>
                <Col sm={4} xs={4} smOffset={4} xsOffset={4}> 
                  <LinkContainer to='/register'>
                    <Button bsStyle='primary' block>Register</Button>
                  </LinkContainer>
                </Col>
                <Col sm={4} xs={4}>
                  {this.state.loading?(
                    <ButtonInput type="submit" value="Wait" disabled/>  
                  ):(
                    <ButtonInput type="submit" value="Login" block/>  
                  )}
                </Col>
              </Row>
            </section>
          </form> 
          </BaseForm> 
          {this.showAlert()} 
        </div>
        ); 
    }
}; 

export default connect()(Login);  
