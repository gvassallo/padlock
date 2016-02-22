import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Grid, Input, Form} from 'react-bootstrap'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'


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
        }
      }; 
    }
    componentDidMount(){
      if(this.props.create) this.state.modify = true; 
      this.state.login.uuid = this.props.login.uuid;  
    }
    close(){
      this.props.dispatch(OptionsActions.loginCardClose()); 
      this.props.dispatch(OptionsActions.modalClose()); 
      this.state.modify = false; 
      this.setState(this.state); 
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
      const {dispatch} = this.props; 
      if(this.props.create){
        dispatch(LoginsActions.addNew(this.props.login));         
        dispatch(OptionsActions.modalClose());
      }else {
        dispatch(LoginsActions.updateLogin(this.props.login)); 
        this.state.modify = false ; 
        this.setState(this.state); 
      }
    }

    addNewLogin(event){ 
        event.preventDefault();
    }

    getButtons(){
      if(this.props.create){
        return(
          <div className="card-block">
            <ButtonInput bsStyle="primary" type="submit" value="Save"/> 
          </div>
        );  
      }else if(this.state.modify){
        return (
          <div className="card-block">
            <Row> 
              <Col xs={3} sm={3}> 
                <ButtonInput bsStyle="primary" type="submit" value="Save"/> 
              </Col> 
              <Col xs={4} sm={3}> 
                <Button className="delete-link" bsStyle="danger" onClick={this.deleteLogin.bind(this)}>Delete</Button>
              </Col> 
            </Row> 
          </div>
        ); 
      }else {
        return(
          <div className="card-block">
            <Button  className="" onClick={this.allowModification.bind(this)}>
              <span className="fa fa-edit"/> 
            </Button>
          </div>
        ); 
      }
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
            <Modal.Header closeButton>
              {this.props.create?(
              <Col xs={8} sm={8}>
                <Input type="text" 
                  placeholder="service" 
                  onChange={this.handleChange('service')}/>
              </Col>
              ):(
              <h4 className="card-title">
                <center>{this.props.login.service}</center>
              </h4>)}
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-block">
                  <form onSubmit={this.saveChanges.bind(this)} action='' className="login-card-form"> 
                    <section>
                      <Row>
                        <Col xs={4} sm={4}>
                          <label className="text-muted">username</label> 
                        </Col>
                        <Col xs={8} sm={8}>
                        {this.state.modify? (
                          <Input type="text" 
                            placeholder={this.props.login.username} 
                            onChange={this.handleChange('username')}/>
                          ) : (
                          <Input type="text" 
                            placeholder={this.props.login.username} 
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
                        {this.state.modify? (
                          <Input type="text" 
                            placeholder={this.props.login.password} 
                            onChange={this.handleChange('password')}/>
                          ) : (
                          <Input type="text" 
                            placeholder={this.props.login.password} 
                            readOnly/>
                        )}
                        </Col> 
                      </Row>
                    </section>
                  <hr/>
                  {this.getButtons()}
                </form> 
              </div>
              </div>
            </Modal.Body>
           </Modal>       
      </div> 
      );  
    }
}

export default connect()(LoginCard); 
