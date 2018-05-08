import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { signup, login, logout } from './util/session_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    let preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {id: window.currentUser.id},
    };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.login = login;
  window.signup = signup;
  window.logout = logout;
  ReactDOM.render(<App />, document.getElementById('root'));
});
