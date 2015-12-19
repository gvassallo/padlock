import alt from '../alt';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.user = null;
    this.token = null;
    this.loading = false;

    this.bindActions(AuthActions);
  }

  onLogin() {
    this.loading = true;
  }

  onLoginSuccess(data) {
    this.loading = false;
    this.token = data.token;
    this.user = data.user;
  }

  onLoginFailed(data) {
    this.loading = false;
    this.user = null;
    this.token = null;
    this.error = data;
  }

  onAuth(data) {
    this.onLoginSuccess(data);
  }

  onLogout() {
    this.loading = false;
    this.user = null;
    this.token = null;
  }
}

export default alt.createStore(AuthStore);
