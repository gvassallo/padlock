import React from 'react'
// import List from './List' 
import {connect} from 'react-redux' 
import * as LoginsActions from '../actions/LoginsActions'
import { Grid, Row, Col, ListGroup, ListGroupItem, Input, ButtonInput, Button} from 'react-bootstrap'  
import  BaseForm  from '../auth/BaseForm'
import ModalForm from '../components/ModalForm'
import LoginsList from '../components/LoginsList' 

const mapStateToProps = (state) => ({
    logins : state.logins.list
});
class Logins extends React.Component {
    constructor(){
        super(); 
        this.state = {
            login : {
                username : '', 
                password : '', 
                service:   '' 
            }
        }
    }

    download(){
        this.props.dispatch(LoginsActions.download()); 
    }

    componentDidMount(){
        this.download();  
    }

    handleChange(field){ 
        return (event) => {
            this.state.login[field] = event.target.value; 
            this.setState(this.state); 
        }; 
    }

    addNewLogin(event){ 
        event.preventDefault(); 
        const {dispatch} = this.props; 
        dispatch(LoginsActions.addNew(this.state));         
    }

    render() {
        return (
        <div>  
        <LoginsList logins={this.props.logins}/> 
        <ModalForm> 
            <Grid> 
                <Row> 
                    <Col sm={4} smOffset={1} md={4} mdOffset={1}  >
                        <form onSubmit={this.addNewLogin.bind(this)} action=''> 
                        <Input type="text" onChange={this.handleChange('service')} placeholder="Enter service" />
                        <Input type="text" onChange={this.handleChange('username')} placeholder="Enter username" />
                        <Input type="password" onChange={this.handleChange('password')} placeholder="Enter password" />
                        <ButtonInput type="submit" value="Add" block/> 
                        </form> 
                    </Col> 
                </Row>  
            </Grid> 
        </ModalForm>
        </div> 
        ); 
    }
}

export default connect(mapStateToProps)(Logins); 
