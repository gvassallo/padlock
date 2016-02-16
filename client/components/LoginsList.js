import React from 'react'; 
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap' 
import LoginCard from './LoginCard'

class LoginsList extends React.Component{
    constructor(){
      super(); 
      this.state = {
        login: {
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
      this.refs.login_card.open(); 
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

export default LoginsList; 
