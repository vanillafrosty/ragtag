import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-info-container">
        <div className="profile-pic">
          <p>THIS IS A PROFILE PIC</p>
        </div>
        <div className="profile-info">
          <p>{this.props.user.username}</p>
          <button type="button">New Post</button>
          0 posts boiii
        </div>
        <h1>WELCOME, {this.props.user.username}</h1>
        <button type="button">Logout</button>
        <h1>HERE is your user feed</h1>

      </div>
    );
  }


}
