import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as OptionsActions from '../actions/OptionsActions'

const mapStateToProps = (state) => ({
    open : state.options.modal_open
});

class ModalForm extends React.Component {

    close() {
      this.props.dispatch(OptionsActions.modalClose());
    }

    render() {
        return (
        <div> 
          <Modal 
            show={this.props.open} 
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
export default connect(mapStateToProps)(ModalForm); 
// vim: set ft=javascript.jsx: 
