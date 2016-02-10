import React from 'react'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; 
import { connect } from 'react-redux'; 
import * as AuthActions from '../actions/AuthActions' 

class HeaderBar extends React.Component {

    logout(event) {
        event.preventDefault();
        const { dispatch } = this.props; 
        dispatch(AuthActions.logout()); 
    }

    render() {
        return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Padlock</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.props.token ? (
            <Nav pullRight>
              <NavDropdown eventKey={1} title={ this.props.user.username } id="basic-nav-dropdown" noCaret>
                <LinkContainer to='/profile'>
                  <MenuItem eventKey={1.1}>Profile</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem eventKey={1.2} onClick={this.logout.bind(this)}>Log out</MenuItem>
              </NavDropdown>
            </Nav>
            ) : (
            <Nav pullRight>
              <LinkContainer to='/login'>
                <NavItem eventKey={2}>Log in</NavItem>
              </LinkContainer>
              <LinkContainer to='/register'>
                <NavItem eventKey={3}>Register</NavItem>
              </LinkContainer>
            </Nav>
            ) }
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
