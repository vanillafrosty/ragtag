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

  componentWillUnmount() {
    this.props.clearErrors();
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
    let renderedErrors;
    if (this.props.errors.length === 0) {
      renderedErrors = '';
    } else {
      renderedErrors = this.props.errors.map( (err, idx) => {
        return <li key={idx}>{err}</li>
      });
    }
    return (
      <div className="sessionContainer">
        <div className="sessionPicContainer">
        </div>
        <div className={renderedErrors === '' ? "sessionFormContainer" : "sessionFormContainerWithErrors"}>
          <div className="sessionForm">
            <div className="sessionErrors">
              <ul>
                {renderedErrors}
              </ul>
            </div>
            <h1 className="title">Ragtag</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Username <br />
                <input type="text" value={this.state.username} onChange={this.handleChange('username')}/>
              </label>
              <br /><br />
              <label>Password <br />
                <input type="password" value={this.state.password} onChange={this.handleChange('password')}/>
              </label>
              <br /><br /><br />
              <button type="submit" className="session-button">{str}</button>

            </form>
            <div className="sessionDemo" onClick={this.props.demoLogin}>Log in as demo user</div>
          </div>
          <div className="sessionPrompt">
            <h3>{other_str}</h3>
            <Link className="session-prompt-link" to={`/${other_path}`}>{other_str_prompt}</Link>
          </div>
        </div>
      </div>
    );
  }


}
