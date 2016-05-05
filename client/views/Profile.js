'use strict' 
import React from 'react'
import {connect} from 'react-redux'
import * as ProfileActions from '../actions/ProfileActions' 
import * as OptionsActions from '../actions/OptionsActions' 
import {Jumbotron} from 'react-bootstrap' 

const mapStateToProps = (state) => ({
  profile: state.profile
}); 

class Profile extends React.Component {

  componentDidMount(){
    this.getUserInfo();  
    this.props.dispatch(OptionsActions.viewChanged('Profile')); 
  }

  getUserInfo(){
    const {dispatch} = this.props; 
    dispatch(OptionsActions.loading()); 
    dispatch(ProfileActions.getUserInfo())  
    .then(()=> {
      dispatch(OptionsActions.loadingEnd());  
    }); 
  }

  getDate(){  
    var d = new Date(this.props.profile.createdAt); 
    return d.getUTCMonth() + '/' + d.getUTCDate() + '/' + d.getFullYear() ;  
  }

  render() {
    return (
      <Jumbotron> 
        <div className="vertical-center"> 
          <h2> {this.props.profile.fullName}</h2> 
          <p>
            <span style={{fontSize: '16px'}}> 
              @{this.props.profile.username} • Member since {this.getDate()}
              <br/>
              {this.props.profile.email} 
            </span> 
          </p> 
        </div> 
      </Jumbotron> 
    ); 
  }
}

export default connect(mapStateToProps)(Profile);  
// vim: set ft=javascript.jsx: 
