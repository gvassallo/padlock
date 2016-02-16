import React from 'react'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
import * as AuthActions from '../actions/AuthActions' 
import * as LoginsActions from '../actions/LoginsActions'
import * as ModalActions from '../actions/ModalActions'

class HeaderBar extends React.Component {

    logout(event) {
        event.preventDefault();
        const { dispatch } = this.props; 
        dispatch(AuthActions.logout()); 
        dispatch(LoginsActions.resetLoginsList()); 
    }

    open(event){
        event.preventDefault();
        const { dispatch } = this.props; 
        dispatch(ModalActions.modalOpen()); 
    }

    render() {
        return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            Padlock
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse> 
          <Nav pullRight>  
              <NavItem eventKey={1} onClick={this.open.bind(this)}> 
                  <span className="glyphicon glyphicon-plus"/>
              </NavItem> 
              <NavItem eventKey={2} onClick={this.logout.bind(this)}> 
                  <span className="glyphicon glyphicon-log-out log-out"/>
              </NavItem> 
          </Nav>
        </Navbar.Collapse> 
      </Navbar>
    ); 
    }
}; 

const mapStateToProps = (state) => ({
    user : state.auth.user,
    token: state.auth.token 
});
export default connect(mapStateToProps)(HeaderBar); 
