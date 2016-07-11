import React from 'react' 
import ReactDOM from 'react-dom'
import { connect } from 'react-redux' 
import { browserHistory }  from 'react-router'
import { Router, Route, Link, IndexRoute } from 'react-router'
import App from './app'
import Login from './auth/Login'
import Register from './auth/Register'
import AuthService from './services/AuthService'
import { auth } from './actions/AuthActions'
import Logins from './views/Logins'
import Profile from './views/Profile' 
import Group from './views/Group'

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
      replace({ 
        pathname: '/', 
        state: {nextPathname: nextState.location.pathname }
      });
    }
  }

  render() {
    return(
      <Router router={AppRouter} history={browserHistory}>
        <Route path='/' component={App} onEnter={this.requireAuth.bind(this)}> 
          <IndexRoute component={Logins}/> 
          <Route path='/profile' component={Profile}/> 
          <Route path='/g/:groupId' component={Group}/>
        </Route> 
        <Route path='login' component={Login} onEnter={this.alreadyLogged}/> 
        <Route path='register' component={Register} onEnter={this.alreadyLogged}/> 
      </Router> 
    ); 
  }
}; 


export default connect()(AppRouter); 
// vim: set ft=javascript.jsx: 
