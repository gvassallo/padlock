import React from 'react' 
import {connect} from 'react-redux' 

class Spinner extends React.Component {

  render(){
    return (
      <div className="spinner"> 
        {this.props.loading? (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        ) : (
        <div></div>
        )} 
      </div> 
    ); 
  }
}

const mapStateToProps = (state) => ({
  loading: state.options.loading  
}); 

export default connect(mapStateToProps)(Spinner); 
// vim: set ft=javascript.jsx: 
