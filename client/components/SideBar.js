import React from 'react'
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap'


class SideBar extends React.Component{
    render(){
      return( 
        <Row > 
            <Col sm={2} md={2}> 
          <div className="sidebar-nav">
                <div className="navbar navbar-default" role="navigation">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <span className="visible-xs navbar-brand">Sidebar menu</span>
                  </div>
                  <div className="navbar-collapse collapse sidebar-navbar-collapse">
                    <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Menu Item 1</a></li>
                      <li><a href="#">Menu Item 2</a></li>
                    </ul>
                  </div>
                </div>
          </div>
            </Col>
          <div> 
            <Col sm={10} md={10}>
                {this.props.children} 
            </Col> 
          </div>
        </Row>
      );  
    }

}

export default SideBar; 
