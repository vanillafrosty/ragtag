import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';
import PostIndexContainer from './post_index_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <AuthRoute path="/login" component={LoginForm} />
          <AuthRoute path="/signup" component={SignupForm} />
          <ProtectedRoute path="/" component={PostIndexContainer} />
        </Switch>
      </div>
    );
  }
}
