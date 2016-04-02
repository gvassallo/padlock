import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, ButtonInput, Row, Col, Grid, Input, Form,DropdownButton, MenuItem} from 'react-bootstrap'
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import LoginsService from '../services/LoginsService'
import TextField from 'material-ui/lib/text-field'

class NewLoginCard extends React.Component {
    constructor(){
      super();  
      this.state = {
        login: {
          service: '', 
          username: '', 
          password: '' 
        }, 
        loading: false, 
        snackbarOpen: false
      }; 
    }

    close(){
      this.state = {
        login: {
          service: '', 
          username: '', 
          password: '' 
        }, 
      }; 
      this.state.loading = false; 
      this.setState(this.state); 
      this.props.dispatch(OptionsActions.modalClose()); 
    }

    handleChange(field){
      return (event) => {
        this.state.login[field] = event.target.value; 
        this.setState(this.state); 
      }
    }

    addNewLogin(event){
      event.preventDefault();
      this.state.loading = true; 
      this.setState(this.state); 
      const {dispatch} = this.props; 
      dispatch(LoginsActions.addNew(this.state.login))
        .then(()=> {
          dispatch(OptionsActions.snackBarOpen('New login created!')); 
          this.close(); 
        })
        .catch(err => {
          console.log(err); 
          alert('Service cannot remain empty!'); 
          this.close(); 
        }); 
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
          <h4 className="card-title">
            <center>Create new login</center>
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-block">
              <form 
                onSubmit={this.addNewLogin.bind(this)} 
                action='' 
                className='login-card-form'
                autoComplete='off'
              > 
               <section>
                  <Row>
                    <Col xs={4} sm={4}>
                      <label className="text-muted">service</label> 
                    </Col>
                    <Col xs={8} sm={8}>
                      <Input type="text" 
                        onChange={this.handleChange('service')}/>
                    </Col>
                  </Row>
                  </section>
                <section>
                  <Row>
                    <Col xs={4} sm={4}>
                      <label className="text-muted">username</label> 
                    </Col>
                    <Col xs={8} sm={8}>
                      <Input type="text" 
                        onChange={this.handleChange('username')}/>
                    </Col> 
                  </Row>
                </section>
                <section>
                  <Row>
                    <Col xs={4} sm={4}>
                      <label className="text-muted">password</label> 
                    </Col>
                    <Col xs={8} sm={8}>
                      <Input type="text"
                        onChange={this.handleChange('password')}/>
                    </Col> 
                  </Row>
                </section>
              <hr/>
              <div className="card-block">
                {this.state.loading? (
                <Button bsStyle="default" disabled>Wait</Button> 
                ):(
                <ButtonInput bsStyle="primary" type="submit" value="Save"/> 
                )} 
              </div>
            </form> 
          </div>
          </div>
        </Modal.Body>
       </Modal>       
      </div> 
      );  
    }
}

export default connect()(NewLoginCard); 
// vim: set ft=javascript.jsx: 
