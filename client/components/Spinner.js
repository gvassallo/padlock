import React from 'react' 
import {connect} from 'react-redux' 
import {Modal, ProgressBar} from 'react-bootstrap' 

class Spinner extends React.Component {

    render(){
      return (
        <div className="spinner"> 
          {this.props.loading? (
            <span className="fa fa-circle-o-notch fa-spin"/>
          ):(<div></div>
          )}
          {/*<Modal 
            bsSize="small"
            show={this.props.loading} 
            aria-labelledby="contained-modal-title-sm"
            container={this}> 
            Loading
          </Modal>*/} 
        </div> 
      ); 
    }
}

const mapStateToProps = (state) => ({
  loading: state.options.loading  
}); 

export default connect(mapStateToProps)(Spinner); 
