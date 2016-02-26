'use strict'; 
import React from 'react'; 
import {connect} from 'react-redux'; 
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
