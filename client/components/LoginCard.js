import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Grid, Input, Form,DropdownButton, MenuItem} from 'react-bootstrap'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import LoginsService from '../services/LoginsService'


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
    }

    handleChange(field){
      return (event) => {
        this.state.login[field] = event.target.value; 
        this.setState(this.state); 
      }
    }

    close(){
      this.props.dispatch(OptionsActions.loginCardClose()); 
      this.state.modify = false; 
      this.state.reveal = false; 
      this.setState(this.state); 
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
      this.props.dispatch(LoginsActions.deleteLogin(this.state.login)); 
      this.close(); 
    }

    saveChanges(event){
      event.preventDefault();
      const {dispatch} = this.props; 
      dispatch(LoginsActions.updateLogin(this.props.login)); 
      this.state.modify = false ; 
      this.setState(this.state); 
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
            buttonAfter={this.getDrowpDown()}
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

    getDrowpDown(){
      return(
      <DropdownButton pullRight title="" id="input-dropdown-addon">
        <MenuItem key="1" onClick={this.revealPassword.bind(this)}>Reveal Password</MenuItem>
      </DropdownButton>); 
    }

    render(){
      return(
      <div> 
        <Modal 
          show={this.props.open} 
          onHide={this.close.bind(this)}
          container={this}
          bsSize="small"
          aria-labelledby="contained-modal-title">
          <div className="panel">
            <div className="panel-heading"> 
              <h3 className="card-title">
                <center>{this.state.login.service}</center>
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.saveChanges.bind(this)} action='' className="login-card-form"> 
                <section>
                  <Row>
                    <Col xs={4} sm={4}>
                      <label className="text-muted">username</label> 
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
                </section>
                <section>
                  <Row>
                    <Col xs={4} sm={4}>
                      <label className="text-muted">password</label> 
                    </Col>
                    <Col xs={8} sm={8}>
                      {this.getPasswordField()}
                    </Col> 
                  </Row>
                </section>
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
       </Modal>       
      </div> 
      );  
    }
}

export default connect()(LoginCard); 
// vim: set ft=javascript.jsx: 
