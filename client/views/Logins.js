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
    logins : state.logins.list, 
    modal_open: state.options.modal_open 
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
          <LoginCard open={this.props.modal_open} login={this.state.login} create={true}/>
          <LoginsList logins={this.props.logins}/>
        </div> 
        ); 
    }
}

export default connect(mapStateToProps)(Logins); 
