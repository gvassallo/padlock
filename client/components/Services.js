import React from 'react'
import List from './List' 
import {connect} from 'react-redux' 
import * as ServicesActions from '../actions/ServicesActions'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'  

class Services extends React.Component {
    download(){
        this.props.dispatch(ServicesActions.download(this.state)); 
    }
    componentDidMount(){
        this.download();  
    }
    render() {
        return (
        <div>  
         <Grid> 
           <Row> 
             <Col sm={6} smOffset={3} md={4} mdOffset={4}>  
              <div className='panel panel-default'>
               <div className='panel-body'>
                <ListGroup> 
                    {this.props.services.map(listValue => {
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

}

const mapStateToProps = (state) => ({
    services : state.services.list
});
export default connect(mapStateToProps)(Services); 
