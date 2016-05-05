import React from 'react'; 
import {connect} from 'react-redux'
import {If, Then} from 'react-if'
import Sidebar from 'react-sidebar'
import {ListGroup, ListGroupItem} from 'react-bootstrap' 
import LoginCard from './LoginCard'
import * as OptionsActions from '../actions/OptionsActions'

const mapStateToProps = (state) => ({
    login_card_open : state.options.login_card_open  
}); 

class LoginsList extends React.Component{
  constructor(){
    super(); 
    this.state = {
      login: {
        uuid: '', 
        service: '', 
        username: '', 
        password: ''
      }, 
      sidebarOpen: false
    }; 
  }

  handleClick(login){
    this.state.login = login; 
    this.state.sidebarOpen = true; 
    this.setState(this.state); 
    this.props.dispatch(OptionsActions.loginCardOpen()); 
  }

  onSetSidebarOpen(open) {
    this.state.sidebarOpen = open; 
    this.setState(this.state);
  }

  render(){
    var sidebarContent = <LoginCard login={this.state.login} update={this.state.sidebarOpen} />; 
    return(
    <div className="login-list"> 
      <Sidebar sidebar={sidebarContent} 
        pullRight={true} 
        onSetOpen={this.onSetSidebarOpen.bind(this)}
        open={this.state.sidebarOpen}
        style={{
        sidebar: {background: 'white'}
        }}
      > 
        <div></div> 
      </Sidebar> 
      <ListGroup> 
        {this.props.logins.map(listValue => {
        return <ListGroupItem 
                  key={listValue.uuid}
                  header={listValue.service}
                  onClick={this.handleClick.bind(this,listValue)}
                >
            {listValue.username}
          </ListGroupItem>;
        })}
      </ListGroup> 
      {/*<If condition={this.props.login_card_open}> 
        <Then> 
        </Then> 
      </If> */}
      </div>  
    ); 
  }
}

export default connect(mapStateToProps)(LoginsList); 
// vim: set ft=javascript.jsx: 
