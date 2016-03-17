import React from 'react'
 
import SideBar from './components/SideBar'

export default class App extends React.Component {
    render(){
        return (
        <div>
          <SideBar> 
              {this.props.children} 
            </SideBar>
        </div> 
        )
    }
}

// vim: set ft=javascript.jsx: 
