import React from 'react'; 

import { Navbar, Nav, NavItem, Dropdown, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
import {browserHistory} from 'react-router' 
import CreateMenu from './CreateMenu' 
import * as AuthActions from '../actions/AuthActions' 
import * as LoginsActions from '../actions/LoginsActions'

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

    render() {
        return (
    <div className="header">
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <div className="title"> 
          <Navbar.Brand>
            {this.props.current_view}  
          </Navbar.Brand>
        </div> 
        </Navbar.Header>
          <Nav pullRight>  
            <NavDropdown eventKey={1} id='create-dropdown' title={this.getPlus()} noCaret>
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
    current_view: state.options.current_view
});

export default connect(mapStateToProps)(HeaderBar); 
// vim: set ft=javascript.jsx: 

