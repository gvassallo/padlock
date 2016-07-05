'use strict'; 
import React from 'react'
import {connect} from 'react-redux'
import {If, Then, Else} from  'react-if'
import Sidebar from 'react-sidebar'
import {browserHistory} from 'react-router'
import LoginsList from '../components/LoginsList'
import GroupMenu from '../components/GroupMenu'
import * as OptionsActions from '../actions/OptionsActions' 
import * as GroupsActions from '../actions/GroupsActions' 
import '../scss/components/Group.scss'


class Groups extends React.Component {
  constructor(){
    super();  
    this.state = {
      groupId: '', //group uuid 
      iGroup: 0,  // group index in the groups state array 
      sidebar_open: false, 
      loading : true, 
      group: ''
    }; 
  }

  componentWillMount(){
    if(this.props.groups.length === 0){
      browserHistory.push('/');
    }
  }

  componentDidMount(){
    this.update(this.props); 
  }

  //to update the view when an other group is selected
  componentWillReceiveProps(nextPros){
    this.update(nextPros); 
  }

  update(props){
    const {dispatch} = props; 
    var group = { uuid: props.params.groupId};
    if(this.state.groupId === group.uuid){
      this.setState(this.state);
      return;
    }
    this.state.loading = true;
    this.setState(this.state);
    this.state.groupId = props.params.groupId; 
    this.state.iGroup = props.groups 
      .findIndex(elem => this.state.groupId === elem.uuid) ; 

    //fetch data 
    dispatch(OptionsActions.loading());
    dispatch(GroupsActions.getLoginsFromGroup(group))
      .then(() => {
        return dispatch(GroupsActions.getMembers(group));
      })
      .then(() => {
        dispatch(OptionsActions.loadingEnd());
        this.state.loading = false;
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
    return(
      <div className='group-view'>
        <If condition={this.state.loading || this.props.groups.length == 0}>
          <Then><div></div></Then>
          <Else>  
            <div>
              <Sidebar sidebar={<GroupMenu group={this.props.groups[this.state.iGroup]}/>} 
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
          </Else>
        </If>
      </div>
    ); 
  }
}

const mapStateToProps = (state) => ({
    groups: state.groups.list,
}); 

export default connect(mapStateToProps)(Groups);  
// vim: set ft=javascript.jsx: 
