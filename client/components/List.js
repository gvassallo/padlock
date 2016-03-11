import React from 'react'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'  


class List extends React.Component {

    render() {
        return (
        <div>  
         <Grid> 
           <Row> 
             <Col sm={6} smOffset={3} md={4} mdOffset={4}>  
              <div className='panel panel-default'>
               <div className='panel-body'>
                <ListGroup> 
                    {this.props.list.map(listValue => {
                     return <ListGroupItem>{listValue.name}</ListGroupItem>;
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
}; 

export default List; 

// vim: set ft=javascript.jsx: 
