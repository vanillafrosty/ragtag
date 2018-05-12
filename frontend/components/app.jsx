import React from 'react';
import { Switch } from 'react-router-dom';
import SignupForm from './session/signup_form_container';
import LoginForm from './session/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomeContainer from './home_container';


const App = (props) => {
  return (
    <div className="appContainer">
      <Switch>
        <AuthRoute path="/login" component={LoginForm} />
        <AuthRoute path="/signup" component={SignupForm} />
        <ProtectedRoute path="/" component={HomeContainer} />
      </Switch>
    </div>
  );
};

export default App;
