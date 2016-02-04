import React from 'react'
// import List from './List' 
import {connect} from 'react-redux' 
import * as ServicesActions from '../actions/ServicesActions'
import { Grid, Row, Col, ListGroup, ListGroupItem, Input, ButtonInput, Button} from 'react-bootstrap'  
import  BaseForm  from '../auth/BaseForm'

const mapStateToProps = (state) => ({
    services : state.services.list
});

class Services extends React.Component {
    constructor(){
        super(); 
        // this.state = {
        //     name: '' 
        // } 
        this.state = {
            service : {
                name : ''  
            }
        }
    }

    download(){
        this.props.dispatch(ServicesActions.download()); 
    }

    componentDidMount(){
        this.download();  
    }

    handleChange(field){ 
        return (event) => {
            this.state.service[field] = event.target.value; 
            this.setState(this.state); 
        }; 
    }

    addNewService(event){ 
        event.preventDefault(); 
        const {dispatch} = this.props; 
        dispatch(ServicesActions.addNew(this.state));         
    }

    render() {
        return (
        <div>  
        <BaseForm> 
            <form onSubmit={this.addNewService.bind(this)} action=''> 
                <Input type="text" onChange={this.handleChange('name')} placeholder="Enter service" />
                <ButtonInput type="submit" value="Add" block/> 
            </form> 
        </BaseForm> 
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

export default connect(mapStateToProps)(Services); 
// //         <Grid> 
//            <Row> 
//              <Col sm={6} smOffset={3} md={4} mdOffset={4}>  
//               <div className='panel panel-default'>
//                <div className='panel-body'>
//                 <ListGroup> 
//                     {this.props.services.map(listValue => {
//                      return <ListGroupItem>{listValue.name}</ListGroupItem>;
//                 })}
//                 </ListGroup> 
//               </div>
//             </div>
//           </Col>
//          </Row>
//         </Grid>
