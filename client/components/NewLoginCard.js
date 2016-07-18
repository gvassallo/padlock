import React from 'react'
import {connect} from 'react-redux'
import {If, Then, Else} from 'react-if'
import {Modal, Button, ButtonInput, Row, Col, Grid, Input, Form,DropdownButton, MenuItem} from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import * as GroupsActions from '../actions/GroupsActions'
import LoginsService from '../services/LoginsService'
import '../scss/components/CreateMenu.scss'

class NewLoginCard extends React.Component {
  constructor(){
    super();  
    this.state = {
      login: {
        service: '', 
        username: '', 
        password: '', 
        groupId: '' 
      }, 
      loading: false, 
      snackbarOpen: false, 
      groupsDownloaded: false  
    }; 
  }
  
  componentDidMount(){
    if(this.props.groups.length == 0 && this.state.groupsDownloaded == false) {
      this.props.dispatch(GroupsActions.downloadGroups())
        .then(() => {
          this.state.groupsDownloaded = true;  
          this.setState(this.state); 
        }); 
    }else{
      this.state.groupsDownloaded = true;  
      this.setState(this.state); 
    }
  }

  close(){
    this.props.dispatch(OptionsActions.dropdownClose()); 
  }

  handleChange(field){
    return (event) => {
      this.state.login[field] = event.target.value; 
      this.setState(this.state); 
    }
  }

  addNewLogin(event){
    event.preventDefault();
    this.state.loading = true; 
    this.setState(this.state); 
    if(this.state.login.groupId === '' || this.state.login.groupId === 'none')
      this.addNewPersonalLogin(); 
    else  
      this.addNewLoginToGroup();
  }

  addNewPersonalLogin(){
    var login = this.state.login; 
    delete login.groupId; 
    const {dispatch} = this.props; 
    dispatch(LoginsActions.addNew(login))
      .then(()=> {
        dispatch(OptionsActions.snackBarOpen('New login created!')); 
        this.close(); 
      })
      .catch(err => {
        alert('Service cannot remain empty!'); 
        this.close(); 
      }); 
  }

  addNewLoginToGroup(){
    var group = {uuid: this.state.login.groupId}; 
    var login = this.state.login; 
    delete login.groupId; 
    const {dispatch} = this.props; 
    dispatch(GroupsActions.addNewLoginToGroup(group, login))
      .then(()=> {
        dispatch(OptionsActions.snackBarOpen('New login added to group!')); 
        this.close(); 
      })
      .catch(err => {   
        alert('Service cannot remain empty!'); 
        this.close(); 
      }); 
  }

  render(){
    return(
      <div className='create-new'> 
        <form 
          onSubmit={this.addNewLogin.bind(this)} 
          action='' 
          className='login-card-form'
          autoComplete='off'> 
          <section>
            <Row>
              <Col xs={4} sm={4}>
                <label className="text-muted">service</label> 
              </Col>
              <Col xs={8} sm={8}>
                <Input type="text"
                  className='newlogincard-input'  
                  onChange={this.handleChange('service')}/>
              </Col>
            </Row>
          </section>
          <section>
            <Row>
              <Col xs={4} sm={4}>
                <label className="text-muted">username</label> 
              </Col>
              <Col xs={8} sm={8}>
                <Input type="text" 
                  className='newlogincard-input'  
                  onChange={this.handleChange('username')}/>
              </Col> 
            </Row>
          </section>
          <section>
            <Row>
              <Col xs={4} sm={4}>
                <label className="text-muted">password</label> 
              </Col>
              <Col xs={8} sm={8}>
                <Input type="password"
                  className='newlogincard-input'  
                  onChange={this.handleChange('password')}/>
              </Col> 
            </Row>
          </section>
          <section>
            <Row>
              <Col xs={4} sm={4}>
                <label className="text-muted">group</label> 
              </Col>
              <Col xs={8} sm={8}>
                <If condition={this.state.groupsDownloaded}>
                  <Then>
                    <div>
                      <select onChange={this.handleChange('groupId')}> 
                          <option value='none'>(none)</option>
                          {this.props.groups.map(listValue => {
                          return <option value={listValue.uuid} key={listValue.uuid}> 
                                  {listValue.name}
                                 </option>; 
                          })}
                      </select>
                    </div>
                  </Then> 
                  <Else> 
                    <select> 
                      <option value='loading'>loading..</option>
                    </select> 
                  </Else> 
                </If> 
              </Col>
            </Row>
          </section>
          <hr/>
          <div className='newlogincard-submit'>
            <If condition={this.state.loading}>
              <Then> 
                <Button bsStyle="default" disabled>Wait</Button> 
              </Then>
              <Else>
                <ButtonInput bsStyle="primary" type="submit" value="Save"/> 
              </Else>
            </If>
          </div>
        </form> 
      </div> 
    );  
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups.toArray()
}); 

export default connect(mapStateToProps)(NewLoginCard); 
// vim: set ft=javascript.jsx: 
