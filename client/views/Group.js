'use strict'; 
import React from 'react'
import {connect} from 'react-redux'
import {If, Then} from  'react-if'
import Sidebar from 'react-sidebar'
import LoginsList from '../components/LoginsList'
import GroupMenu from '../components/GroupMenu'
import * as OptionsActions from '../actions/OptionsActions' 
import * as GroupsActions from '../actions/GroupsActions' 
import '../scss/components/Group.scss'

const mapStateToProps = (state) => ({
    groups: state.groups.list
}); 

class Groups extends React.Component {
  constructor(){
    super();  
    this.state = {
      groupId: '', //group uuid 
      iGroup: 0,  // group index in the groups state array 
      sidebar_open: false
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

  onSetSidebarOpen(isOpen){
    this.state.sidebar_open = isOpen;  
    this.setState(this.state);
  }

  openSidebar(){
    this.state.sidebar_open = true; 
    this.setState(this.state);
  }

  render(){
    var sidebarContent = <GroupMenu group={this.props.groups[this.state.iGroup]}/>;
    return(
      <div className='group-view'>
      <Sidebar sidebar={sidebarContent} 
        pullRight={true} 
        onSetOpen={this.onSetSidebarOpen.bind(this)}
        open={this.state.sidebar_open}
        style={{
        sidebar: {background: 'white'}
        }}
      > 
        <div></div> 
      </Sidebar> 
        <h3 className='group-name'> 
          {this.props.groups[this.state.iGroup].name}
        </h3> 
        <a className='show-group-menu' onClick={this.openSidebar.bind(this)}>show menu</a> 
        <LoginsList logins={this.props.groups[this.state.iGroup].logins}/>
      </div>
    ); 
  }
}

export default connect(mapStateToProps)(Groups);  
// vim: set ft=javascript.jsx: 
