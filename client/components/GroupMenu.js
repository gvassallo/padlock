import React from 'react' 
import {connect} from 'react-redux'
import {Input, Button, Alert, ListGroupItem, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap'
import {If, Then, Else} from 'react-if'
import {browserHistory} from 'react-router'
import * as GroupsActions from '../actions/GroupsActions'
import * as OptionsActions from '../actions/OptionsActions'
import '../scss/components/GroupMenu.scss'

class GroupMenu extends React.Component{
  constructor(){
    super();
    this.state = {
      member: '', 
      error: false, 
      deleteError: false, 
      errorMessage: ''
    };
  }

  handeChange(event){
    this.state.member = event.target.value; 
    this.setState(this.state);
  }

  addMember(event){
    event.preventDefault(); 
    const {dispatch} = this.props;      
    dispatch(GroupsActions.addMemberToGroup(this.props.group, this.state.member))
      .then(() => {
        dispatch(OptionsActions.snackBarOpen(
          'User \''+ this.state.member+ '\' joined the group!'
        )); 
        this.setState(this.state);
      })
      .catch(err => {
        this.state.error = true; 
        this.setState(this.state);
      });
  }

  delete(){
    this.props.dispatch(
      GroupsActions.deleteGroup(this.props.group)
    )
    .catch(err=> {
        this.state.deleteError = true; 
        this.state.errorMessage = 'Error removing the group';
        this.setState(this.state);
    })
  }

  deleteMember(member){
    this.props.dispatch(
      GroupsActions.deleteMemberFromGroup(this.props.group, member)
    )
    .then(()=> {
      this.props.dispatch(OptionsActions.snackBarOpen(
      'User \''+member.fullName+'\' removed from group \''+this.props.group.name+'\'!'));
    })
    .catch(err=> {
        this.state.deleteError = true; 
        this.state.errorMessage = 'Error removing a member';
        this.setState(this.state);
    })

  }

  leave(){
    this.props.dispatch(
      GroupsActions.leaveGroup(this.props.group)
    )
    .catch(err=> {
        this.state.deleteError = true; 
        this.state.errorMessage = 'Error leaving the group.';
        this.setState(this.state);
    })
  }

  handleAlertDismiss(){
    this.setState({
      error: false, 
      deleteError: false
    }); 
  }

  showAlert(){
    var style = {
      marginTop: '10px', 
    }; 
    return(
      <Alert bsStyle="danger" 
        style={style} 
        dismissAfter={3000}
        onDismiss={this.handleAlertDismiss.bind(this)} > 
        <center>
          User not found!
          <p>Change few things up and try submitting again</p>
        </center>
      </Alert>
    );
  }

  showAlert2(){
    var style = {
      marginTop: '10px', 
    }; 
    return(
      <Alert bsStyle="danger" 
        style={style} 
        dismissAfter={3000}
        onDismiss={this.handleAlertDismiss.bind(this)} > 
        <center>
          <p>{this.state.errorMessage}</p>
        </center>
      </Alert>
    );
  }

  render(){
    return(
    <div className='group-menu'>
      <div className='group-menu-heading'>
        <h3>Menu</h3>
      </div>
      <hr/>
      <h4>Add member</h4>
      <div className='group-menu-body'> 
        <form action='' onSubmit={this.addMember.bind(this)}> 
          <div className='group-search-member-input'>
            <Input type='text' onChange={this.handeChange.bind(this)} placeholder='Add member (e.g jon@snow.com)'/>
          </div> 
          <div className='group-search-member-button'>
            <Button type='submit' >
              <span className='fa fa-plus'/>
            </Button>
          </div>
        </form>
        <If condition={this.state.error}>
          <Then>{this.showAlert()}</Then>
        </If>
        <h4>Members</h4>
        <div>
          <If condition={!(this.props.group.members == undefined)}>
            <Then> 
              <ListGroup> 
                {this.props.group.members.toArray().map(listValue => {
                return <ListGroupItem key={listValue.uuid}>
                  <div>
                    <span>{listValue.fullName}</span>
                    <If condition={listValue.UserGroup.admin}>
                      <Then><span className='admin-tag'>admin</span></Then>
                      <Else>
                        <If condition={this.props.group.UserGroup.admin}>
                          <Then><a className='delete-tag fa fa-trash' onClick={this.deleteMember.bind(this, listValue)}></a></Then>
                        </If>
                      </Else>
                    </If>
                  </div>
                </ListGroupItem>; 
                })}
              </ListGroup> 
            </Then>
          </If>
        </div>
        <If condition={this.state.deleteError}>
          <Then>{this.showAlert2()}</Then>
        </If>
        <If condition={this.props.group.UserGroup.admin}>
          <Then>
            <Button bsStyle='danger' onClick={this.delete.bind(this)} className='delete-button'>Delete</Button>
          </Then>
          <Else>
            <Button bsStyle='primary' onClick={this.leave.bind(this)} className='leave-button'>Leave</Button>
          </Else>
        </If>
      </div>
    </div>
    );
  }
}

export default connect()(GroupMenu);
// vim: set ft=javascript.jsx: 
