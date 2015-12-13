import React from 'react'; 

import {PageHeader} from 'react-bootstrap'; 
import { Link } from 'react-router'; 
import HeaderBar from './components/HeaderBar'

export default class App extends React.Component {
    render(){
         return (
      <div>
        <HeaderBar/>
        <div className = 'container-fluid'> 
            {this.props.children} 
        </div> 
      </div>
        ); 
    }
}; 
