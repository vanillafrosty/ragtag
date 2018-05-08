import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(input) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [input] : e.target.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then( resp => {
      this.props.history.push('/');
    });
  }

  render() {
    let str, other_path, other_str, other_str_prompt;
    if (this.props.formType === 'login') {
      str = "Log in!";
      other_path = 'signup';
      other_str = 'New User?';
      other_str_prompt = "Sign up!";
    } else {
      str = "Sign up!";
      other_path = 'login';
      other_str = 'Already Registered?';
      other_str_prompt = "Log in!";
    }
    return (
      <div>
        <Link to="/">Home</Link>
        {this.props.errors}
        <h1>{str}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <input type="text" value={this.state.username} onChange={this.handleChange('username')}/>
          </label>

          <label>Password
            <input type="text" value={this.state.password} onChange={this.handleChange('password')}/>
          </label>

          <button type="submit">{str}</button>

        </form>
        <h3>{other_str}</h3>
        <Link to={`/${other_path}`}>{other_str_prompt}</Link>
      </div>
    );
  }


}
