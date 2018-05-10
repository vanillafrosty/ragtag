import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-info-container">
        <div className="profile-pic">
        </div>
        <div className="profile-info">
          <p>{this.props.user.username}</p>
          <button type="button">New Post</button>
          <br />0 posts boiii
          <h1>WELCOME, {this.props.user.username}</h1>
          <button type="button" onClick={this.props.logout}>Logout</button>
          <h1>HERE is your user feed</h1>
        </div>

      </div>
    );
  }


}