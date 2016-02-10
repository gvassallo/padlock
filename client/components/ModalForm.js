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
            <Button bsStyle="primary" className="plus-button" onClick={this.open.bind(this)} >
                New Service 
            </Button>   
          <Modal 
            show={this.state.showModal} 
            onHide={this.close.bind(this)}
            container={this}
            aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add new login</Modal.Title>
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
