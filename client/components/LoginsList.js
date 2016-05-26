import React from 'react'; 
import {connect} from 'react-redux'
import {If, Then, Else} from 'react-if'
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
      }
    }; 
  }

  handleClick(login){
    const {dispatch} = this.props;
    this.state.login = login; 
    this.setState(this.state); 
    dispatch(OptionsActions.loginCardOpen());
  }

  onSetSidebarOpen(open) {
    const {dispatch} = this.props;
    if(open)
      dispatch(OptionsActions.loginCardOpen());
    else 
      dispatch(OptionsActions.loginCardClose());
  }

  render(){
    //temporary fix  
    var sidebarContent = //Every time the component is mounted 
      <If condition={this.props.login_card_open}><Then> 
        <LoginCard login={this.state.login}/></Then>
        <Else> 
          <div className='login-card login-card-body'></div>
        </Else>
      </If>;

    return(
    <div className="login-list"> 
      <Sidebar sidebar={sidebarContent} 
        pullRight={true} 
        onSetOpen={this.onSetSidebarOpen.bind(this)}
        open={this.props.login_card_open}
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
    </div>  
    ); 
  }
}

export default connect(mapStateToProps)(LoginsList); 
// vim: set ft=javascript.jsx: 
