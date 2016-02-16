import React from 'react'
import { Link } from 'react-router'
import {LinkContainer } from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'
import HeaderBar from './HeaderBar'
class SideBar extends React.Component{

    render(){
      return( 
      <div className="page-sidebar-expanded page-with-sidebar"> 
        <div className="nicescroll sidebar-expanded sidebar-wrapper" tabIndex="0" >
          <ul className="nav nav-sidebar">
            <li>
              <LinkContainer to="/">
                <a href=""> 
                  <span className="glyphicon glyphicon-home"></span>
                </a> 
              </LinkContainer> 
            </li>
            <li> 
              <LinkContainer to="/profile">
                <a href="">
                  <span className="glyphicon glyphicon-user"></span>
                </a> 
              </LinkContainer> 
            </li>
          </ul>
        </div> 
        <div className="content-wrapper">  
          <HeaderBar/> 
          {this.props.children} 
        </div> 
      </div> 
      );  
    }

}

export default SideBar; 
