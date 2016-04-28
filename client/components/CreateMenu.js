import React from 'react' 
import {connect} from 'react-redux' 
import {browserHistory} from 'react-router' 
import * as OptionsActions from '../actions/OptionsActions'
// import styles from '../scss/_style.scss' 
require('../scss/createMenu.scss'); 

class CreateMenu extends React.Component{
  constructor(){
    super();  
  }

  newLogin(event){
      event.preventDefault();
      const { dispatch } = this.props; 
      dispatch(OptionsActions.modalOpen()); 
      browserHistory.push('/');  
  }

  newGroup(event){
    event.preventDefault();
  }

  render(){

    return(
      <div className='create-menu'> 
        <center> 
          <strong> Create </strong>  
        </center> 
        <hr/> 
        <div className='create-menu-item'> 
          <a  onClick={this.newLogin.bind(this)}>
            <strong>Create a new Login Card..</strong> 
            <span> 
              A login card is a login card..  
            </span> 
          </a>
        </div> 
        <div className='create-menu-item'> 
        <a onClick={this.newGroup.bind(this)}>
          <strong>Create a new Group..</strong> 
          <span> 
            Create a group with your friends to share drugs and other beautiful things.. 
          </span> 
        </a>
        </div> 
      </div> 
    ); 
  }
}
export default connect()(CreateMenu); 


// vim: set ft=javascript.jsx: 
