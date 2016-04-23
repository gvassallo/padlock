import React from 'react'; 

import { Input, ButtonInput, Button, Alert, Row, Col } from 'react-bootstrap'; 
import {LinkContainer} from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
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
        .catch(()=>{
          this.state.loading = false; 
          this.state.alertShow = true; 
          this.setState(this.state); 
         }); 
    }

    handleAlertDismiss(){
      this.setState({
        alertShow: false
      }); 
    }

    showAlert(){
      var style = {
        marginRight: '10px', 
        marginLeft: '10px'
      }; 
      if(this.state.alertShow){
        return (
          <Row> 
            <Alert bsStyle="danger" 
              style={style} 
              onDismiss={this.handleAlertDismiss.bind(this)} > 
                <center>
                  <h4>Holy shit!</h4>
                  <p>Change a few things up and try submitting again</p>
                </center>
              </Alert> 
          </Row>);
      }
    }

    render() {
        return (
        <div className="login-form">
          <BaseForm> 
            <div className='panel-heading'>
              <span style={{color: 'white', fontSize: '16px'}}>Login</span>
            </div>
            <div className='panel-body'>
              <form onSubmit={this.login.bind(this)} action='' autoComplete='off'> 
                <section> 
                  {this.showAlert()} 
                </section> 
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
                    <Col sm={4} smOffset={4}>
                      {this.state.loading?(
                        <ButtonInput type="submit" value="Wait " disabled/>  
                      ):(
                        <ButtonInput type="submit" value="Login" block/>  
                      )}
                    </Col>
                    <Col sm={4}> 
                      <LinkContainer to='/register'>
                        <Button bsStyle='primary' block>Register</Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                </section>
              </form> 
            </div>
          </BaseForm> 
        </div>
        ); 
    }
}

export default connect()(Login);  
// vim: set ft=javascript.jsx: 
