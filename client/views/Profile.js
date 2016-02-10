'use strict'; 
import React from 'react'; 
import {connect} from 'react-redux'; 
import * as ProfileActions from '../actions/ProfileActions' 
import {Jumbotron} from 'react-bootstrap' 

const mapStateToProps = (state) => ({
    profile: state.profile
}); 

class Profile extends React.Component {

    componentDidMount(){
      this.getUserInfo();  
    }

    getUserInfo(){
      this.props.dispatch(ProfileActions.getUserInfo());  
    }

    render() {
      return (
        <Jumbotron> 
          <div className="vertical-center"> 
            <h3> {this.props.profile.fullName}</h3> 
            <p>@{this.props.profile.username}.</p> 
          </div> 
        </Jumbotron> 
        ); 
    }
}

export default connect(mapStateToProps)(Profile);  
