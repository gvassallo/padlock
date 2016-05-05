import React from 'react'
import {LinkContainer } from 'react-router-bootstrap'
import HeaderBar from './HeaderBar'
import Spinner from './Spinner' 


class SideBar extends React.Component{

    render(){
      return( 
        <div className="content-wrapper">  
          <HeaderBar/> 
          <Spinner/>
          {this.props.children}
        </div> 
      );  
    }
}

export default SideBar; 
// vim: set ft=javascript.jsx: 
