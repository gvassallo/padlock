import React from 'react' 
import {connect} from 'react-redux'
import {Input, Button, Alert, ListGroupItem, ListGroup} from 'react-bootstrap'
import {If, Then} from 'react-if'
import * as GroupsActions from '../actions/GroupsActions'
import * as OptionsActions from '../actions/OptionsActions'
import '../scss/components/GroupMenu.scss'

class GroupMenu extends React.Component{
  constructor(){
    super();
    this.state = {
      member: '', 
      error: false
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
      })
      .catch(err => {
        this.state.error = true; 
        this.setState(this.state);
      });
  }

  handleAlertDismiss(){
    this.setState({
      error: false 
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
            <Input type='text' onChange={this.handeChange.bind(this)} placeholder='Add member (e.g john@snow.com)'/>
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
          <ListGroup> 
          {this.props.group.members.map(listValue => {
            return <ListGroupItem key={listValue.uuid}>
                        {listValue.fullName} 
                  </ListGroupItem>; 
            })}
          </ListGroup> 
        </div>
      </div>
    </div>
    );
  }
}

export default connect()(GroupMenu);
// vim: set ft=javascript.jsx: 
