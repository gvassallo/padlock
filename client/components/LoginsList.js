import React from 'react'; 
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap' 

class LoginsList extends React.Component{
 

    render(){
      return(
      <div className="login-list"> 
          <ListGroup> 
          { this.props.logins.map(listValue => {
            return <ListGroupItem key={listValue.uuid} header={listValue.service}>
              {listValue.username}
            </ListGroupItem>;
          })}
          </ListGroup> 
      </div> 
      ); 
    }
}

export default LoginsList; 
