import React from 'react' 
import {connect} from 'react-redux'
import Snackbar from 'material-ui/lib/snackbar' 
import * as OptionsActions from '../actions/OptionsActions'

class MySnackBar extends React.Component {
  constructor(){
    super(); 
    this.style = {
      backgroundColor: '#44A1A0', 
      textAlign: 'center'
    }; 
  }
  handleRequestClose(){
    this.props.dispatch(OptionsActions.snackBarClose()); 
  }; 

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message} 
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose.bind(this)}
          bodyStyle={this.style} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.options.snackbarOpen, 
  message: state.options.message
}); 

export default connect(mapStateToProps)(MySnackBar); 
