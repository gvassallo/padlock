import React from 'react'
// import List from './List' 
import {connect} from 'react-redux' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import { Grid, Row, Col, ListGroup, ListGroupItem, Input, ButtonInput, Button} from 'react-bootstrap'  
import  BaseForm  from '../auth/BaseForm'
import ModalForm from '../components/ModalForm'
import NewLoginCard from '../components/NewLoginCard'
import LoginsList from '../components/LoginsList' 
import Footer from '../components/Footer'
import {ProgressBar} from 'react-bootstrap' 

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
      this.props.dispatch(OptionsActions.viewChanged('Logins')); 
    }

    download(){
      const {dispatch} = this.props;  
      dispatch(OptionsActions.loading()); 
      dispatch(LoginsActions.download())
      .then(()=> {
        dispatch(OptionsActions.loadingEnd()); 
      });  
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
          <NewLoginCard open={this.props.modal_open} login={this.state.login}/>
          <LoginsList logins={this.props.logins}/>
          <Footer/> 
        </div> 
        ); 
    }
}

export default connect(mapStateToProps)(Logins); 
