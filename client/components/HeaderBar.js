import React from 'react'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 

export default class HeaderBar extends React.Component {
    render() {
        return (
            <Navbar fixedTop fluid >
                <Navbar.Header> 
                    <Navbar.Brand>
                        <a href="#">Padlock</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer to="/login"> 
                            <NavItem eventKey={1}>Login</NavItem> 
                        </LinkContainer>
                        <LinkContainer to="/register"> 
                            <NavItem eventKey={2}>Register</NavItem> 
                        </LinkContainer>
                    </Nav> 
                </Navbar.Collapse> 
            </Navbar> 
        ); 
    }
}; 
