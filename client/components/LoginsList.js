import React from 'react'; 
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap' 

class LoginsList extends React.Component{
 

    render(){
      return(
      <div className="login-list"> 
        <Grid> 
          <Row> 
            <Col sm={6} smOffset={2} md={6} mdOffset={2}>  
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <ListGroup> 
                  { 
                    this.props.logins.map(listValue => {
                    return <ListGroupItem key={listValue.uuid}>{listValue.service}</ListGroupItem>;
                  })}
                  </ListGroup> 
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div> 
      ); 
    }
}

export default LoginsList; 
