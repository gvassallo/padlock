import React from 'react'
 
import SideBar from './components/SideBar'
import Snackbar from './components/SnackBar' 

export default class App extends React.Component {
    render(){
        return (
        <div>
          <SideBar> 
            {this.props.children} 
            <Snackbar/> 
          </SideBar>
        </div> 
        )
    }
}

// vim: set ft=javascript.jsx: 
