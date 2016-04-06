import React from 'react' 
import {connect} from 'react-redux' 
import {Modal} from 'react-bootstrap' 
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/create';
import * as OptionsActions from '../actions/OptionsActions' 
import * as LoginsActions from '../actions/LoginsActions' 
import LoginsService from '../services/LoginsService' 

class LoginCard extends React.Component {
  constructor(){
    super();  
    this.state = {
      disabled: true, 
      modify: false, 
      type: 'password', 
      login: {
        service: '', 
        username: '', 
        password: '', 
        uuid: '' 
      } 
    }; 
  }

  componentDidMount(){
    this.state.login = this.props.login; 
  }

  close(){  
    this.setState({modify: false, disabled: true, type: 'password'}); 
    this.props.dispatch(OptionsActions.loginCardClose()); 
  }

  handleChange(field){
    return (event) => {
      this.state.login[field] = event.target.value; 
      this.setState(this.state); 
    }
  }

  allowModification(event){
    event.preventDefault(); 
    //TODO remove this shit! 
    LoginsService.getPassword(this.state.login)
     .then(password => {    
      this.state.login.password = password; 
      this.state.modify = true; 
      this.state.disabled = false; 
      this.state.type = 'text'; 
      this.setState(this.state); 
    }); 
  }

  deleteLogin(event){
    event.preventDefault();  
    const {dispatch} = this.props; 
    dispatch(LoginsActions.deleteLogin(this.props.login))
    .then(()=> {
      this.setState({
        modify: false, 
        type: 'password', 
        disabled: true
      }); 

      dispatch(
        OptionsActions
        .snackBarOpen('Login: \''+ this.props.login.service+ '\' deleted!')
      ); 

      dispatch(OptionsActions.loginCardClose());  
    }); 
  }

  saveChanges(event){
    event.preventDefault();
    const {dispatch} = this.props; 
    dispatch(LoginsActions.updateLogin(this.props.login))
      .then(()=> {
        this.setState({
          modify: false, 
          type: 'password', 
          disabled: true
        }); 

        dispatch(
          OptionsActions
          .snackBarOpen('Login: \''+ this.props.login.service+ '\' updated!')
        ); 

        dispatch(OptionsActions.loginCardClose()); 
      });
  }

  render(){
    return(
      <div> 
        <Modal 
          show={this.props.open} 
          onHide={this.close.bind(this)}
          container={this}
          bsSize="small"
          aria-labelledby="contained-modal-title">
         <Card>
            <CardMedia>
              <img src="http://im.ziffdavisinternational.com/t/ign_it/screenshot/default/netflix-logo_wkms.1920.jpg"
                height='150px'/>
            </CardMedia>
            <CardTitle title={this.state.login.service} style={{left: '10px'}}/> 
            {!this.state.modify ? 
              (
                <FloatingActionButton 
                  style={{
                    marginLeft: '79%',
                    marginTop: '-90px',
                    zIndex: '10',
                    position: 'absolute'}}
                  secondary={true} 
                  onClick={this.allowModification.bind(this)}
                >
                  <ContentAdd />
                </FloatingActionButton>) : (<div/>) } 
            <CardText> 
              <span className="fa fa-smile-o" style={{fontSize: '20px'}}/> 
              <TextField
                hintText="Username"
                style={{
                paddingLeft: '10%', 
                width: '80%', 
                ':disabled': {
                  color: 'black' 
                  }
                }} 
                value={this.state.login.username}
                onChange={this.handleChange('username').bind(this)}
                disabled={this.state.disabled}
                underlineShow={false} 
              /><br/> 
              <span className="fa fa-lock" style={{fontSize: '20px'}}/> 
              <TextField
                hintText="Password"
                style={{paddingLeft: '10%', width: '80%'}} 
                type={this.state.type}  
                onChange={this.handleChange('password').bind(this)}
                value={this.state.login.password}
                disabled={this.state.disabled}
                underlineDisabledStyle = {{}}
                underlineShow={false} 
              /><br/>
            </CardText> 
            <CardActions>
              {this.state.modify? (
              <div> 
                <FlatButton 
                  label="Save"
                  primary={true}
                  onClick={this.saveChanges.bind(this)}
                />
                <FlatButton 
                  label="Delete" 
                  secondary={true}
                  onClick={this.deleteLogin.bind(this)}
                />
              </div>): (
              <div/>  
              )} 
            </CardActions>
          </Card>
        </Modal> 
      </div> 
    ); 
  }
   
}

export default connect()(LoginCard); 
// vim: set ft=javascript.jsx: 
