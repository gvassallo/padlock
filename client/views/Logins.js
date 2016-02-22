import React from 'react'
// import List from './List' 
import {connect} from 'react-redux' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import { Grid, Row, Col, ListGroup, ListGroupItem, Input, ButtonInput, Button} from 'react-bootstrap'  
import  BaseForm  from '../auth/BaseForm'
import ModalForm from '../components/ModalForm'
import LoginCard from '../components/LoginCard'
import LoginsList from '../components/LoginsList' 
import Spinner from '../components/Spinner'

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

    componentDidMount(){
      this.download();  
    }

    download(){
        this.props.dispatch(LoginsActions.download()); 
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
        dispatch(LoginsActions.addNew(this.state.login));         
        dispatch(OptionsActions.modalClose());
    }

    render() {
        return (
        <div className="modal-container">  
          {/*<Spinner/> 
          <ModalForm className="container" ref={'modal'}> 
                  <form onSubmit={this.addNewLogin.bind(this)} action=''> 
                    <Input type="text" onChange={this.handleChange('service')} placeholder="Enter service" />
                    <Input type="text" onChange={this.handleChange('username')} placeholder="Enter username" />
                    <Input type="password" onChange={this.handleChange('password')} placeholder="Enter password" />
                    <ButtonInput type="submit" value="Add" block/> 
                  </form> 
          </ModalForm> */}
          <LoginCard/>
          <LoginsList logins={this.props.logins}/>
        </div> 
        ); 
    }
}

export default connect(mapStateToProps)(Logins); 
