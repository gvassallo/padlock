import React from 'react' 
import { Input, ButtonInput, Button, Row, Col, Alert } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
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
  
    handleAlertDismiss(){
      this.setState({
        alertShow: false
      }); 
    }

    showAlert(){
      var style = {
        marginRight: '10px', 
        marginLeft: '10px',
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
        <div className="register-form">
          <BaseForm>  
            <div className='panel-heading'>
              <span style={{color: 'white', fontSize: '16px'}}>Register</span>
            </div>
            <div className='panel-body'>
              <small>Already have an account? Go to the <Link to='/login'>login</Link> page!</small>
              <br/><br/><br/> 
              <form onSubmit={this.register.bind(this)} action='' autoComplete='off'>
                {this.showAlert()}
                <Row> 
                  <Col sm={5} md={5}>
                    <div style={{textAlign: 'right'}}>
                      <label>Username</label>
                    </div>
                  </Col>
                  <Col sm={6} md={6}>
                    <Input type='text' onChange={this.handleChange('username')}/>
                  </Col>
                </Row> 
                <Row> 
                  <Col sm={5} md={5}>
                    <div style={{textAlign: 'right'}}>
                      <label>Email</label>
                    </div>
                  </Col>
                  <Col sm={6} md={6}>
                    <Input type='text' onChange={this.handleChange('email')}/>
                  </Col>
                </Row> 
                <Row> 
                  <Col sm={5} md={5}>
                    <div style={{textAlign: 'right'}}>
                      <label>Password</label>
                    </div>
                  </Col>
                  <Col sm={6} md={6}>
                    <Input type='password' onChange={this.handleChange('password')}/>
                  </Col>
                </Row> 
                <Row> 
                  <Col sm={5} md={5}>
                    <div style={{textAlign: 'right'}}>
                      <label>Full Name</label>
                    </div>
                  </Col>
                  <Col sm={6} md={6}>
                    <Input type='text' onChange={this.handleChange('fullname')}/>
                  </Col>
                </Row> 
                <hr/>
                <Row>
                  <Col sm={4} smOffset={4}>
                    <center> 
                      {this.state.loading?(
                      <ButtonInput type='submit' value='Wait' disabled/>
                      ):(
                      <ButtonInput type='submit' bsStyle="primary" value='Register' block />
                      )} 
                    </center> 
                  </Col>
                </Row> 
              </form>
            </div> 
          </BaseForm> 
        </div>
        ); 
    }
} 

export default connect()(Register); 
// vim: set ft=javascript.jsx: 
