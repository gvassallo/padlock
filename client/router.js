import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, IndexRoute } from 'react-router';
import Login from './components/Login'
import Register from './components/Register'
import App from './app'

export default class AppRouter extends React.Component{
    render() {
         return(
          <Router>
            <Route path='/' component={App}/> 
            <Route path='/login' component={Login}/> 
            <Route path='/register' component={Register}/> 
          </Router> 
        ); 
    }
}; 
