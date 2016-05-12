import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {ListGroup, ListGroupItem} from 'react-bootstrap' 
import GroupCell from './GroupCell'
import * as GroupsActions from '../actions/GroupsActions' 
import '../scss/components/GroupList.scss'

class GroupList extends React.Component{
  constructor(){
    super(); 
  }

  render(){
    return(
      <div className='groups'> 
        <ListGroup className='group-list'> 
        {this.props.groups.map(listValue => {
          return <ListGroupItem key={listValue.uuid} >
                    <Link to={`/g/${listValue.uuid}`}>
                        <GroupCell 
                          name={listValue.name} 
                        /> 
                    </Link>
                  </ListGroupItem>; 
          })}
        </ListGroup> 
      </div> 
    ); 
  }; 
}

export default connect()(GroupList); 
// vim: set ft=javascript.jsx: 