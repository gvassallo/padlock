import React from 'react'; 

import {PageHeader} from 'react-bootstrap'; 
import { Link } from 'react-router'; 
import HeaderBar from './components/HeaderBar'
import SideBar from './components/SideBar' 

export default class App extends React.Component {
    render(){
         return (
        <div>
            <HeaderBar/>
            <SideBar> 
              {this.props.children} 
            </SideBar>
        </div>
        ); 
    }
}; 
