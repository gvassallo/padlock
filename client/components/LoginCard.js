import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Input, DropdownButton, MenuItem} from 'react-bootstrap'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import LoginsService from '../services/LoginsService'
require('../scss/components/LoginCard.scss'); 

class LoginCard extends React.Component {
  constructor(){
    super();  
    this.state = {
      modify: false, 
      login: {
        service: '', 
        username: '', 
        password: '', 
        uuid: '' 
      }, 
    reveal: false, 
    loading: false 
    }; 
  }

  componentDidMount(){
    this.state.login=this.props.login;  
    this.setState(this.state); 
  }

  componentWillReceiveProps(nextProps){
    this.state.login = nextProps.login;   
    this.state.modify = false; 
    this.state.reveal = false; 
    this.setState(this.state); 
  }

  handleChange(field){
    return (event) => {
      this.state.login[field] = event.target.value; 
      this.setState(this.state); 
    }
  }

  close(){
    this.state.modify = false; 
    this.state.reveal = false; 
    this.setState(this.state); 
    this.props.dispatch(OptionsActions.loginCardClose()); 
  }

  allowModification(event){
    event.preventDefault();
    this.state.loading = true; 
    this.setState(this.state); 
    LoginsService.getPassword(this.props.login)
     .then(password => {
        this.state.loading = false; 
        this.state.login.password = password; 
        this.state.modify = true ; 
        this.setState(this.state); 
      }); 
  }

  deleteLogin(event){
    event.preventDefault();  
    const {dispatch} = this.props; 
    dispatch(LoginsActions.deleteLogin(this.props.login))
    .then(()=> {
      this.state.modify = false; 
      this.state.reveal = false; 
      this.setState(this.state); 
      dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' deleted!')); 
      dispatch(OptionsActions.loginCardClose());  
    }); 
  }

  saveChanges(event){
    event.preventDefault();
    const {dispatch} = this.props; 
    dispatch(LoginsActions.updateLogin(this.props.login))
      .then(()=> {
        this.state.modify = false ; 
        this.setState(this.state); 
        dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' updated!')); 
      });
  }

  revealPassword(event){
      event.preventDefault(); 
      LoginsService.getPassword(this.props.login)
        .then(password => {
          this.state.login.password = password; 
          this.state.reveal = true; 
          this.setState(this.state); 
        }); 
  }

  getPasswordField(){
    if(!this.state.modify && !this.state.reveal) {
      return(
        <Input type="password"
          value="password"
          onChange={this.handleChange('password')} 
          buttonAfter={this.getDropDown()}
          readOnly/>
      ); 
    }else if(!this.state.modify && this.state.reveal){ 
      return(
        <Input type="text"
          value={this.state.login.password}
          onChange={this.handleChange('password')} readOnly/>
      ); 
    }else {
      return(
        <Input type="text"
          value={this.state.login.password}
          onChange={this.handleChange('password')}/>
      );  
    }
  }

  getDropDown(){
    return(
    <DropdownButton pullRight title="" id="input-dropdown-addon">
      <MenuItem key="1" onClick={this.revealPassword.bind(this)}>Reveal Password</MenuItem>
    </DropdownButton>); 
  }

  getDate(date){
    var d = new Date(date); 
    return d.getUTCMonth() + '/' + d.getUTCDate() + '/' + d.getFullYear() ;  
  }

  render(){
    return(
      <div className="login-card flex-item"> 
        <div>
          <div className="login-card-header"> 
            <h3>
              {this.state.login.service}
            </h3>
          </div>
          <div className="login-card-body">
            <form onSubmit={this.saveChanges.bind(this)} action='' className="login-card-form"> 
              <Row>
                <Col xs={4} sm={4}>
                  <label className="text-muted">Username</label> 
                </Col>
                <Col xs={8} sm={8}>
                {this.state.modify? (
                  <Input type="text" 
                    value={this.state.login.username} 
                    onChange={this.handleChange('username')}/>
                  ) : (
                  <Input type="text" 
                    value={this.state.login.username} 
                    readOnly/>
                )}
                </Col> 
              </Row>
              <Row>
                <Col xs={4} sm={4}>
                  <label className="text-muted">Password</label> 
                </Col>
                <Col xs={8} sm={8}>
                  {this.getPasswordField()}
                </Col> 
              </Row>
              <Row>
                <Col xs={4} sm={4}>
                  <label className="text-muted">Created</label> 
                </Col>
                <Col xs={8} sm={8}>
                  {this.getDate(this.state.login.createdAt)}
                </Col> 
              </Row>
              <Row>
                <Col xs={4} sm={4}>
                  <label className="text-muted">Modified</label> 
                </Col>
                <Col xs={8} sm={8}>
                  {this.getDate(this.state.login.updatedAt)}
                </Col> 
              </Row>
              <hr/>
              {this.state.modify? (
              <div className="card-block">
                <Row> 
                  <Col xs={3} sm={3}> 
                    {this.props.loading?(
                    <ButtonInput bsStyle="primary" type="" value="Wait"/> 
                    ):(
                    <ButtonInput bsStyle="primary" type="submit" value="Save"/> 
                    )}
                    </Col> 
                  <Col xs={4} sm={3}> 
                    <Button className="delete-link" bsStyle="danger" onClick={this.deleteLogin.bind(this)}>Delete</Button>
                  </Col> 
                </Row> 
              </div>
              ):(
              <div className="">
                <Button  className="" onClick={this.allowModification.bind(this)}>
                  {this.state.loading ? (                 
                  <div>Wait</div> ):(
                  <span className="fa fa-edit"/> 
                  )}
                </Button>
              </div>)}
            </form> 
          </div>
        </div>
      </div> 
    );  
  }
}

export default connect()(LoginCard); 
// vim: set ft=javascript.jsx: 
