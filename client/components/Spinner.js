import React from 'react' 
import {connect} from 'react-redux' 
import {Modal} from 'react-bootstrap' 

class Spinner extends React.Component {

    render(){
      return (
        <div> 
          <Modal 
            show={this.props.loading} 
            bsSize="small"
            container={this}
            aria-labelledby="contained-modal-title">
            <Modal.Body>
              <center> 
                <h3>Loading</h3>
              </center> 
            </Modal.Body>
          </Modal>       
        </div> 
      ); 
    }
}

const mapStateToProps = (state) => ({
  loading: state.options.loading  
}); 

export default connect(mapStateToProps)(Spinner); 
// vim: set ft=javascript.jsx: 
