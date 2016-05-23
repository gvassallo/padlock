'use strict'; 
import React from 'react'
import {connect} from 'react-redux'
import {If, Then} from  'react-if'
import LoginsList from '../components/LoginsList'
import * as OptionsActions from '../actions/OptionsActions' 
import * as GroupsActions from '../actions/GroupsActions' 

const mapStateToProps = (state) => ({
    groups: state.groups.list
}); 

class Groups extends React.Component {
  constructor(){
    super();  
    this.state = {
      groupId: '', //group uuid 
      iGroup: 0  // group index in the groups state array 
    }; 
  }

  componentDidMount(){
    this.update(this.props); 
  }
  //to update the view when an other group is selected
  componentWillReceiveProps(nextPros){
    console.log('Group receives props');
    this.update(nextPros); 
  }

  update(props){
    const {dispatch} = props; 
    this.state.groupId = props.params.groupId; 
    var group = { uuid: props.params.groupId};
    this.state.iGroup = props.groups 
      .findIndex(elem => this.state.groupId === elem.uuid) ; 
    dispatch(GroupsActions.getLoginsFromGroup(group))
      .then(()=>{
        this.setState(this.state);  
    }); 
  }

  render(){
    return(
      <div className='group-view'>
        <center> 
          <h1> 
            {this.props.groups[this.state.iGroup].name}
          </h1> 
        </center> 
        <LoginsList logins={this.props.groups[this.state.iGroup].logins}/>
      </div>
    ); 
  }
}

export default connect(mapStateToProps)(Groups);  
// vim: set ft=javascript.jsx: 
