import React from 'react'
import {connect} from 'react-redux' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import { Grid, Row, Col, ListGroup, ListGroupItem, Input, ButtonInput, Button} from 'react-bootstrap'  
import BaseForm  from '../auth/BaseForm'
import LoginsList from '../components/LoginsList' 
import '../scss/components/LoginCard.scss'

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
      <div>  
        <h4 style={{paddingLeft: '50px'}}>
          <span className='fa fa-lock'/> My Logins
        </h4> 
        <LoginsList logins={this.props.logins}/>
        <hr/>
        <center> 
          <p> 
            ©2016 Gabriele Vassallo 
          </p> 
        </center>
      </div> 
    ); 
  }
}

export default connect(mapStateToProps)(Logins); 
// vim: set ft=javascript.jsx: 
