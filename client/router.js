import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, IndexRoute } from 'react-router';
import Login from './components/login'

import App from './app'

export default class AppRouter extends React.Component{
    render() {
         return(
          <Router>
            <Route path='/' component={App}/> 
            <Route path='/login' component={Login}/> 
          </Router> 
        ); 
    }
}; 
