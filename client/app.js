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
{/*<SideBar className="sidebar" /> */}
            <div id="page-wrap" className = 'container-fluid inner-content'> 
                    {this.props.children} 
            </div>  
        </div>
        ); 
    }
}; 
