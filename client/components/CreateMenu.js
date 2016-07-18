import React from 'react' 
import {connect} from 'react-redux' 
import {If , Then, Else} from 'react-if' 
import NewGroup from './NewGroup' 
import NewLoginCard from './NewLoginCard' 
import * as OptionsActions from '../actions/OptionsActions'

import '../scss/components/CreateMenu.scss'

class CreateMenu extends React.Component{
  constructor(){
    super();  
    this.state = {
      create: {
        group: false, 
        login: false 
      }
    }; 
  }

  newGroup(event){
    event.preventDefault();
    this.state.create.group = true; 
    this.setState(this.state);     
  }

  newLoginCard(event){
    event.preventDefault(); 
    this.state.create.login = true; 
    this.setState(this.state);     
  }
   
  close(){
    this.props.dispatch(OptionsActions.dropdownClose()); 
  }

  back(){
    this.state.create.group = false; 
    this.state.create.login = false; 
    this.setState(this.state); 
  }

  render(){
    return(
      <div className='create-menu'> 
        <div>
          <If condition={this.state.create.login}>
            <Then> 
              <div className='create-new-header'> 
                <a className='fa fa-arrow-left create-menu-back create-menu-icon' onClick={this.back.bind(this)}/> 
                <div> Create Login.. </div>  
                <a className='fa fa-close create-menu-close create-menu-icon' onClick={this.close.bind(this)} /> 
              </div> 
            </Then> 
            <Else>
              <If condition={this.state.create.group}> 
                <Then> 
                  <div className='create-new-header'> 
                    <a className='fa fa-arrow-left create-menu-back create-menu-icon' onClick={this.back.bind(this)}/> 
                    <div> Create Group.. </div>  
                    <a className='fa fa-close create-menu-close create-menu-icon' onClick={this.close.bind(this)} /> 
                  </div> 
                </Then>  
                <Else> 
                  <div className='create-new-header'> 
                    <div> Create.. </div>  
                    <a className='fa fa-close create-menu-close create-menu-icon' onClick={this.close.bind(this)} /> 
                  </div> 
                </Else> 
              </If> 
            </Else> 
          </If> 
        <hr/> 
        <If condition={this.state.create.login}> 
          <Then><NewLoginCard/></Then> 
          <Else> 
            <If condition={this.state.create.group}> 
              <Then><NewGroup test={this.state.create.group}/></Then>
              <Else>
                <div className='create-menu-body'> 
                  <div className='create-menu-item'> 
                    <a onClick={this.newLoginCard.bind(this)}>
                      <strong>Create a new Login Card..</strong> 
                      <span> 
                        A login card is a login card..  
                      </span> 
                    </a>
                  </div> 
                  <div className='create-menu-item'> 
                    <a onClick={this.newGroup.bind(this)}>
                      <strong>Create a new Group..</strong> 
                      <span> 
                        Create a group with your friends to share drugs and other beautiful things.. 
                      </span> 
                    </a>
                  </div> 
                </div> 
              </Else> 
            </If> 
          </Else> 
        </If> 
        </div>
      </div> 
    ); 
  }
}
export default connect()(CreateMenu); 
 
// vim: set ft=javascript.jsx: 
