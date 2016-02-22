import React from 'react'; 
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap' 
import LoginCard from './LoginCard'
import {connect} from 'react-redux'
import * as OptionsActions from '../actions/OptionsActions'

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
      // problem to solve, redux doesn't allow refs 
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
        <LoginCard ref={'login_card'} login={this.state.login}/>
      </div> 
      ); 
    }
}

export default connect()(LoginsList); 
