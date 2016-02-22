import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Grid, Input, Form} from 'react-bootstrap'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'

const mapStateToProps = (state) => ({
    open : state.options.login_card_open 
}); 

class LoginCard extends React.Component {
    constructor(){
      super();  
      this.state = {
        modify: false, 
        login: {
          username: '', 
          password: '', 
          uuid: '' 
        }
      }; 
    }
    componentDidMount(){
      this.state.login.uuid = this.props.login.uuid;  
    }
    close(){
      this.props.dispatch(OptionsActions.loginCardClose()); 
    }

    deleteLogin(event){
      event.preventDefault();  
      this.props.dispatch(LoginsActions.deleteLogin(this.props.login)); 
      this.close(); 
    }

    allowModification(event){
      event.preventDefault();
      this.state.modify = true ; 
      this.setState(this.state); 
    }
    handleChange(field){
      return (event) => {
        this.props.login[field] = event.target.value; 
        this.setState(this.state); 
      }
    }

    saveChanges(event){
      event.preventDefault();
      console.log(this.props.login); 
      this.props.dispatch(LoginsActions.updateLogin(this.props.login)); 
      this.state.modify = false ; 
      this.setState(this.state); 
    }

    render(){
      return(
      <div className="login-card"> 
            <Modal 
              show={this.props.open} 
              onHide={this.close.bind(this)}
              container={this}
              bsSize="small"
              aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <h4 className="card-title">{this.props.login.service}</h4>
            </Modal.Header>
            <Modal.Body>
              {this.state.modify? ( 
              <div className="card">
                <div className="card-block">
                  <form onSubmit={this.saveChanges.bind(this)} action=''> 
                    <span className="text-muted">username</span> 
                    <Input type="text" 
                      placeholder={this.props.login.username} 
                      onChange={this.handleChange('username')}/>
                    <span className="text-muted">password</span> 
                    <Input type="text"
                      placeholder={this.props.login.password} 
                      onChange={this.handleChange('password')}/>
                  <hr/>
                  <div className="card-block">
                    <ButtonInput type="submit" value="Save" block/> 
                    <a href="" className="delete-link" onClick={this.deleteLogin.bind(this)}>Delete</a>
                  </div>
                </form> 
              </div>
              </div>
                ) : (  
              <div className="card">
                <div className="card-block">
                    <span className="text-muted">username</span> 
                    <Input type="text" placeholder={this.props.login.username} readOnly/>
                    <span className="text-muted">password</span> 
                    <Input type="text" placeholder={this.props.login.password} readOnly/>
                  <hr/>
                  <div className="card-block">
                    <a href="" className="" onClick={this.allowModification.bind(this)}>Edit</a>
                  </div>
                </div>
              </div>)}
            </Modal.Body>
           </Modal>       
      </div> 
      );  
    }
}

export default connect(mapStateToProps)(LoginCard); 
