import React from 'react'
import { Link } from 'react-router'
import {LinkContainer } from 'react-router-bootstrap'

class SideBar extends React.Component{
    render(){
      return( 
      <div className="page-sidebar-expanded page-with-sidebar"> 
            <div className="nicescroll sidebar-expanded sidebar-wrapper" tabIndex="0" >
              <ul className="nav nav-sideabar">
                  <li className="nav-element">
                    <LinkContainer to="/">
                      <span className="glyphicon glyphicon-home"></span>
                    </LinkContainer> 
                  </li>
                  <li className="nav-element sidebar-user">
                    <span className="glyphicon glyphicon-user"></span>
                  </li>
              </ul>
            </div> 
            <div className="content-wrapper">  
              {this.props.children} 
            </div> 
      </div> 
      );  
    }

}

export default SideBar; 
