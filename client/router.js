import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, IndexRoute } from 'react-router';
import Login from './components/Login'
import Register from './components/Register'
import App from './app'
import history from './history'
import AuthService from './services/AuthService'
import AuthActions from './actions/AuthActions'
import HelloWorld from './components/HelloWorld'

function requireAuth(nextState, replaceState) {
  if (!AuthService.isLoggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  } else {
    AuthActions.auth(AuthService.getUser(), AuthService.getToken());
  }
}

function alreadyLogged(nextState, replaceState) {
  let nextPath = nextState.location.pathname;
  if (AuthService.isLoggedIn())
    console.log("sei ok");
  if (AuthService.isLoggedIn() && (nextPath === '/login' || nextPath === '/register')) {
    replaceState(null, '/');
  }
}

export default class AppRouter extends React.Component{

    render() {
         return(
          <Router history={history} onEnter={requireAuth}>
            <Route path='/' component={App} > 
                <IndexRoute component={HelloWorld}/> 
            </Route> 
            <Route path='login' component={Login} onEnter={alreadyLogged}/> 
            <Route path='register' component={Register} onEnter={alreadyLogged}/> 
          </Router> 
        ); 
    }
}; 

