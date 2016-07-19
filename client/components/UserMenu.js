import React from 'react' 
import {connect} from 'react-redux' 
import * as AuthActions from '../actions/AuthActions'
import '../scss/components/UserMenu.scss'

class UserMenu extends React.Component {

  render(){
    return (
      <div className='user-menu'>
        <div className='user-menu-header'> 
          <center>{this.props.user.fullName}</center>
        </div>
        <hr/>
        <div className='user-menu-item'>
          <a onClick={()=>{this.props.dispatch(AuthActions.logout())}}>
            Logout
          </a>
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user 
}); 

export default connect(mapStateToProps)(UserMenu); 
// vim: set ft=javascript.jsx: 
