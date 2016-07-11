import React from 'react'
 
import HeaderBar from './components/HeaderBar'
import Spinner from './components/Spinner' 
import Snackbar from './components/SnackBar' 

export default class App extends React.Component {
  render(){
    return (
      <div>
        <div className='content-wrapper'>  
          <HeaderBar/>
          <Spinner/>
          {this.props.children} 
          <Snackbar/> 
        </div>  
      </div> 
    )
  }
}

// vim: set ft=javascript.jsx: 
