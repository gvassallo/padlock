import React from 'react'; 
import {ListGroup, ListGroupItem} from 'react-bootstrap' 
import LoginCard from './LoginCard'
import {connect} from 'react-redux'
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

    handleClick(listValue){
      this.state.login.service = listValue.service; 
      this.state.login.username= listValue.username; 
      this.state.login.password= listValue.password; 
      this.state.login.uuid = listValue.uuid; 
      this.props.dispatch(OptionsActions.loginCardOpen()); 
    }

    render(){
      return(
      <div className="login-list"> 
        <ListGroup> 
          { this.props.logins.map(listValue => {
          return <ListGroupItem 
                    key={listValue.uuid}
                    header={listValue.service}
                    onClick={this.handleClick.bind(this,listValue)}
                  >
              {listValue.username}
            </ListGroupItem>;
          })}
        </ListGroup> 
        <LoginCard open={this.props.login_card_open} login={this.state.login}/>
      </div> 
      ); 
    }
}

export default connect(mapStateToProps)(LoginsList); 
// vim: set ft=javascript.jsx: 
