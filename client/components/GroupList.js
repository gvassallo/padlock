import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {ListGroup, ListGroupItem} from 'react-bootstrap' 
import GroupCell from './GroupCell'
import * as GroupsActions from '../actions/GroupsActions' 
import '../scss/components/GroupList.scss'


class GroupList extends React.Component{
  componentDidMount(){
    this.props.dispatch(
      GroupsActions.downloadGroups()
    );
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

const mapStateToProps = (state) => ({
  groups : state.groups.list
});

export default connect(mapStateToProps)(GroupList); 
// vim: set ft=javascript.jsx: 
