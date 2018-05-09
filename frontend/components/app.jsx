import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';
import PostIndexContainer from './post_index_container';
import { ProtectedRoute } from '../util/route_util';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>THIS IS NOT A DANCE</h1>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/" component={PostIndexContainer} />
        </Switch>
      </div>
    );
  }
}
