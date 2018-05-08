import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { signup, login, logout } from './util/session_api_util';


document.addEventListener('DOMContentLoaded', () => {
  window.login = login;
  window.signup = signup;
  window.logout = logout;
  ReactDOM.render(<App />, document.getElementById('root'));
});
