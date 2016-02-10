import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'

class ModalForm extends React.Component {
    constructor() {
        super(); 
        this.state = {
            showModal: false 
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
    render() {
        return (
             
        <div> 
            <Button className="plus-button" onClick={this.open.bind(this)} >
                New Service 
            </Button>   
        <Modal show={this.state.showModal} onHide={this.close.bind(this)} className="container-fluid">
          <Modal.Header closeButton>
            <Modal.Title>Add new service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.props.children} 
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>       
        </div>         
    ); 
    }
}; 
export default ModalForm; 
