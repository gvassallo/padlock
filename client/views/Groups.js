'use strict'; 
import React from 'react'
import {connect} from 'react-redux'
import * as OptionsActions from '../actions/OptionsActions' 
import * as GroupsActions from '../actions/GroupsActions' 
// import * as ProfileActions from '../actions/ProfileActions' 
import ListGridView from '../components/ListGridView' 
import ListGridItem from '../components/ListGridItem' 

const mapStateToProps = (state) => ({
    groups: state.groups.list
}); 

class Groups extends React.Component {

  componentDidMount(){
    this.props.dispatch(OptionsActions.viewChanged('Groups')); 
    this.props.dispatch(GroupsActions.downloadGroups()); 
  }

  render(){
    return(
      <div> 
        <ListGridView groups={this.props.groups}/>         
      </div> 
    ); 
  }
}

export default connect(mapStateToProps)(Groups);  
// vim: set ft=javascript.jsx: 
