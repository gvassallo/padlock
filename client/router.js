import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, IndexRoute } from 'react-router';
import Login from './auth/Login'
import Register from './auth/Register'
import App from './app'
import history from './history'
import AuthService from './services/AuthService'
import { auth } from './actions/AuthActions'
import HelloWorld from './components/HelloWorld'
import { connect } from 'react-redux'; 


class AppRouter extends React.Component{

    requireAuth(nextState, replaceState) {
    if (!AuthService.isLoggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    } else {
        const { dispatch } = this.props;  
        dispatch(auth(AuthService.getUser(), AuthService.getToken())); 
        }
    }

    alreadyLogged(nextState, replaceState) {
        let nextPath = nextState.location.pathname;
        if (AuthService.isLoggedIn() && (nextPath === '/login' || nextPath === '/register')) {
            replaceState(null, '/');
        }
    }


    render() {
         return(
          <Router history={history}>
            <Route path='/' component={App} onEnter={this.requireAuth.bind(this)}> 
                <IndexRoute component={HelloWorld}/> 
            </Route> 
            <Route path='login' component={Login} onEnter={this.alreadyLogged}/> 
            <Route path='register' component={Register} onEnter={this.alreadyLogged}/> 
          </Router> 
        ); 
    }
}; 


export default connect()(AppRouter); 
