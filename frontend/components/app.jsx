import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomeContainer from './home_container';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="appContainer">
        <Switch>
          <AuthRoute path="/login" component={LoginForm} />
          <AuthRoute path="/signup" component={SignupForm} />
          <ProtectedRoute path="/" component={HomeContainer} />
        </Switch>
      </div>
    );
  }
}
