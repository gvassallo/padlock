import React from 'react'
import {Modal, Button, Row, Col, Grid} from 'react-bootstrap'

class LoginCard extends React.Component {
    constructor(){
      super(); 
      this.state ={
        showModal: false, 
      };
    }

    close() {
        this.state.showModal = false; 
        this.setState(this.state); 
    }

    open() {
        this.state.showModal = true; 
        this.setState(this.state); 
    }
    render(){
      return(
      <div className="login-card"> 
            <Modal 
              show={this.state.showModal} 
              onHide={this.close.bind(this)}
              container={this}
              bsSize="small"
              aria-labelledby="contained-modal-title">
           {/* <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title">
                {this.props.login.service}
              </Modal.Title>
            </Modal.Header>*/}
            <Modal.Body>
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">{this.props.login.service}</h4>
                </div>
                <div className="card-block">
                  <hr/>
                  <p className="card-text">
                    <span className="text-muted">username</span> {this.props.login.username}
                  </p>
                  <p className="card-text">
                    <span className="text-muted">password</span> {this.props.login.password}
                  </p>
                  <hr/>
                  <div className="card-block">
                    <a href="" className="">Modify</a>
                    <a href="" className="delete-link">Delete</a>
                  </div>
                </div>
              </div>
            </Modal.Body>
           </Modal>       
      </div> 
      );  
    }
}

export default LoginCard; 
