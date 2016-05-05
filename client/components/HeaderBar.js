import React from 'react'; 

import { Navbar, Nav, NavItem, Dropdown, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
import {browserHistory} from 'react-router' 
import CreateMenu from './CreateMenu' 
import * as AuthActions from '../actions/AuthActions' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'

require('../scss/components/HeaderBar.scss'); 
class HeaderBar extends React.Component {

    logout(event) {
        event.preventDefault();
        const { dispatch } = this.props; 
        dispatch(AuthActions.logout()); 
        dispatch(LoginsActions.resetLoginsList()); 
    }


    getPlus(){
      return (
        <span className="fa fa-plus"/> 
      ); 
    }

    toggleDropdown(isOpen){
      const {dispatch} = this.props; 
      if(isOpen){
        dispatch(OptionsActions.loginCardClose()); 
        dispatch(OptionsActions.dropdownOpen()); 
      }else{
        this.props.dispatch(OptionsActions.dropdownClose()); 
      }
    }

    render() {
      return (
        <div className="header">
          <Navbar fixedTop fluid>
            <Navbar.Header style={{textAlign:'center'}}>
              <span className='header-logo'/> 
            </Navbar.Header>
              <Nav pullRight>  
                <NavDropdown 
                  eventKey={1} 
                  id='create-dropdown' 
                  title={this.getPlus()}
                  open={this.props.dropdown_open}
                  onToggle={this.toggleDropdown.bind(this)}
                  noCaret 
                >
                  <CreateMenu/>               
                </NavDropdown>
                <NavItem eventKey={2} onClick={this.logout.bind(this)}> 
                    <span className="fa fa-sign-out log-out"/>
                </NavItem> 
              </Nav>
          </Navbar>
        </div>
      ); 
    }
}; 

const mapStateToProps = (state) => ({
    user : state.auth.user,
    token: state.auth.token, 
    dropdown_open: state.options.dropdown_open, 
    current_view: state.options.current_view
});

export default connect(mapStateToProps)(HeaderBar); 
// vim: set ft=javascript.jsx: 

