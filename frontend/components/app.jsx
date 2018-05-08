import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';
import PostIndexContainer from './post_index_container';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>THIS IS NOT A DANCE</h1>
        <Route path="/" component={PostIndexContainer}/>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
      </div>
    );
  }
}
