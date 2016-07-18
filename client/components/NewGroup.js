import React from 'react' 
import {connect} from 'react-redux' 
import {Input, Button} from 'react-bootstrap' 
import * as GroupActions from '../actions/GroupsActions' 
import * as OptionsActions from '../actions/OptionsActions'
import '../scss/components/CreateMenu.scss' 

class NewGroup extends React.Component{ 
  constructor(){
    super();      
    this.state = {
      groupName: ''  
    }
  }

  componentDidMount(){
    this.state.groupName = '';  
  }

  close(){
    this.props.dispatch(OptionsActions.dropdownClose()); 
  }

  handleChange(event){
    event.preventDefault(); 
    this.state.groupName = event.target.value; 
  }

  createGroup(event){
    event.preventDefault();  
    const {dispatch} = this.props; 
    dispatch(GroupActions.createGroup(this.state.groupName))
      .then(()=> {
        dispatch(
          OptionsActions.snackBarOpen('New Group \''+ this.state.groupName+'\' created!')
        ); 
        this.close(); 
      }) 
      .catch((err)=> {
        dispatch(
          OptionsActions.snackBarOpen(err.message)
        ); 
      }); 
  }
  
  render(){
    return(
      <div className='create-new create-new-group'>
        <form onSubmit={this.createGroup.bind(this)}> 
          <span>Name</span> 
          <Input type='text' placeholder='Group name' onChange={this.handleChange.bind(this)}/> 
          <Button type='submit' bsStyle='primary'> 
            Create
          </Button> 
        </form> 
      </div>
    ); 
  }
}

export default connect()(NewGroup); 

// vim: set ft=javascript.jsx: 
