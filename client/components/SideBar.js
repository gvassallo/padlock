import React from 'react'
import {LinkContainer } from 'react-router-bootstrap'
import HeaderBar from './HeaderBar'
import Spinner from './Spinner' 


class SideBar extends React.Component{

    render(){
      return( 
      <div className="page-sidebar-expanded page-with-sidebar"> 
        <div className="nicescroll sidebar-expanded sidebar-wrapper" tabIndex="0" >
          <center> 
          <a className="logo" href="#"> 
            <span className="fa fa-lock"/> 
          </a> 
          </center>
          <ul className="nav nav-sidebar">
            <li>
              <LinkContainer to="/">
                <a href="" title="Logins"> 
                  <span className="fa fa-home"></span>
                </a> 
              </LinkContainer> 
            </li>
            <li> 
              <LinkContainer to="/profile">
                <a href="" title="Profile">
                  <span className="fa fa-user"></span>
                </a> 
              </LinkContainer> 
            </li>
          </ul>
        </div> 
        <div className="content-wrapper">  
          <HeaderBar/> 
          <Spinner/>
          {this.props.children}
        </div> 
      </div> 
      );  
    }
}

export default SideBar; 
// vim: set ft=javascript.jsx: 
