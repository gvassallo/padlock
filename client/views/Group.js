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
      iGroup: 0,  // group index in the groups state array 
      sidebar_open: false, 
      loading : true, 
    }; 
  }

  componentDidMount(){
    this.update(this.props); 
  }

  //to update the view when an other group is selected
  componentWillReceiveProps(nextProps){
    this.update(nextProps); 
  }

  update(props){
    const {dispatch} = props; 
    if(props.group === undefined){
      browserHistory.push('/'); 
      return;
    }
    if(this.state.iGroup === props.group.uuid)
      return;
    this.state.loading = true;
    this.setState(this.state);
    this.state.iGroup = props.group.uuid;
    //fetch data 
    dispatch(OptionsActions.loading());
    dispatch(GroupsActions.getLoginsFromGroup(props.group))
      .then(() => {
        return dispatch(GroupsActions.getMembers(props.group));
      })
      .then(() => {
        dispatch(OptionsActions.loadingEnd());
        this.state.loading = false;
        this.setState(this.state);  
      })
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
        {(this.state.loading || this.props.group === undefined) ? (
        <div></div>) : (
            <div>
              <Sidebar sidebar={<GroupMenu group={this.props.group}/>} 
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
                {this.props.group.name}
              </h3> 
              <a className='show-group-menu' onClick={this.openSidebar.bind(this)}>show menu</a> 
              <LoginsList logins={this.props.group.logins.toArray()}/>
            </div>
          )}
      </div>
    ); 
  }
}

const mapStateToProps = (state, ownProps) => ({
  group: state.groups.get(ownProps.params.groupId)
}); 

export default connect(mapStateToProps)(Groups);  
// vim: set ft=javascript.jsx: 
