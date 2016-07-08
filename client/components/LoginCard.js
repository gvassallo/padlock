import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Input, DropdownButton, MenuItem} from 'react-bootstrap'
import {If, Then, Else} from 'react-if'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import * as GroupsActions from '../actions/GroupsActions'
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
        uuid: '', 
        groupId: ''
      }, 
    reveal: false, 
    loading: false 
    }; 
  }

  componentDidMount(){
    this.state.login=this.props.login;  
    this.setState(this.state); 
  }

  handleChange(field){
    return (event) => {
      this.state.login[field] = event.target.value; 
      this.setState(this.state); 
    }
  }

  allowModification(event){
    event.preventDefault();
    this.state.loading = true; 
    this.setState(this.state); 
    const {dispatch} = this.props;
    dispatch(LoginsActions.getPassword(this.props.login))
     .then(() => {
        this.state.loading = false; 
        this.state.modify = true ; 
        this.state.login.password = this.props.revealed_password;
        this.setState(this.state); 
      }) 
    .catch(err => console.log(err));
  }

  deleteLogin(event){
    event.preventDefault();  
    const {dispatch} = this.props; 
    if(this.props.login.groupId!== null){
      var group = {uuid: this.props.login.groupId};
      dispatch(GroupsActions.deleteLoginFromGroup(group, this.props.login))
      .then(()=> {
        dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' deleted!')); 
        dispatch(OptionsActions.loginCardClose());  
        // this.state.modify = false; 
        // this.state.reveal = false; 
        // this.setState(this.state); 
      }); 
    }else {
      dispatch(LoginsActions.deleteLogin(this.props.login))
      .then(()=> {
        dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' deleted!')); 
        dispatch(OptionsActions.loginCardClose());  
        // this.state.modify = false; 
        // this.state.reveal = false; 
        // this.setState(this.state); 
      }); 
    }
  }

  saveChanges(event){
    event.preventDefault();
    const {dispatch} = this.props; 
    if(this.props.login.groupId!== null){
      var group = {uuid: this.props.login.groupId};
      dispatch(GroupsActions.updateLoginToGroup(group, this.props.login))
        .then(()=> {
          this.state.modify = false ; 
          this.setState(this.state); 
          dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' updated!')); 
        });
    }else {
      dispatch(LoginsActions.updateLogin(this.props.login))
        .then(()=> {
          this.state.modify = false ; 
          this.setState(this.state); 
          dispatch(OptionsActions.snackBarOpen('Login: \''+ this.props.login.service+ '\' updated!')); 
        });
    }
  }

  revealPassword(event){
    event.preventDefault(); 
    const {dispatch} = this.props;
    dispatch(LoginsActions.getPassword(this.props.login))
      .then(() => {
        this.state.login.password = this.props.revealed_password;
        this.state.reveal = true; 
        this.setState(this.state); 
      }); 
  }

  getPasswordField(){
    return(
      <If condition={!this.state.modify && !this.state.reveal}><Then> 
        <Input type="password"
          value="password"
          onChange={this.handleChange('password')} 
          buttonAfter={this.getDropDown()}
          readOnly/></Then>
      <Else><If condition={!this.state.modify && this.state.reveal}><Then>
        <Input type="text"
          value={this.state.login.password}
          onChange={this.handleChange('password')} readOnly/>
      </Then><Else> 
        <Input type="text"
          value={this.state.login.password}
          onChange={this.handleChange('password')}/>
        </Else> 
      </If></Else>
      </If>);
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

const mapStateToProps = (state) => ({
  revealed_password: state.logins.password 
});

export default connect(mapStateToProps)(LoginCard); 
// vim: set ft=javascript.jsx: 
