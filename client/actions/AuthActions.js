import AuthService from '../services/AuthService';
import history from '../history';

class AuthActions {
  login(user) {
    AuthService.login(user)
      .then(data => {
        this.actions.loginSuccess(data.user, data.token);
      })
      .catch(message => {
        this.actions.loginFailed(message);
      });
    this.dispatch();
  }

  register(user) {
    AuthService.register(user)
      .then(data => {
        this.actions.loginSuccess(data.user, data.token);
      })
      .catch(message => {
        this.actions.loginFailed(message);
      });
    this.dispatch();
  }

  auth(user, token) {
    this.dispatch({ user, token });
  }
  
  loginSuccess(user, token) {
    this.dispatch({ user, token });
    history.pushState(null, '/');
  }

  loginFailed(data) {
    this.dispatch(data);
  }

  logout() {
    AuthService.logout();
    this.dispatch();
    history.pushState(null, '/login');
  }
}


