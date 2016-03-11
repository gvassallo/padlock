import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, IndexRoute } from 'react-router';
import Login from './auth/Login'
import Register from './auth/Register'
import App from './app'
import { browserHistory }  from 'react-router'
import AuthService from './services/AuthService'
import { auth } from './actions/AuthActions'
import SideBar from './components/SideBar'
import { connect } from 'react-redux' 
import Logins from './views/Logins'
import Profile from './views/Profile' 

class AppRouter extends React.Component{

    requireAuth(nextState, replace) {
    if (!AuthService.isLoggedIn()) {
      replace({ 
        pathname: '/login', 
        state: {nextPathname: nextState.location.pathname }
      });
    } else {
        const { dispatch } = this.props;  
        dispatch(auth(AuthService.getUser(), AuthService.getToken())); 
        }
    }

    alreadyLogged(nextState, replace) {
        let nextPath = nextState.location.pathname;
        if (AuthService.isLoggedIn() && (nextPath === '/login' || nextPath === '/register')) {
            this.context.router.replace('/');
        }
    }


    render() {
         return(
          <Router router={AppRouter} history={browserHistory}>
            <Route path='/' component={App} onEnter={this.requireAuth.bind(this)}> 
              <IndexRoute component={Logins}/> 
              <Route path='/profile' component={Profile} /> 
            </Route> 
            <Route path='login' component={Login} onEnter={this.alreadyLogged}/> 
            <Route path='register' component={Register} onEnter={this.alreadyLogged}/> 
          </Router> 
        ); 
    }
}; 


export default connect()(AppRouter); 
// vim: set ft=javascript.jsx: 
