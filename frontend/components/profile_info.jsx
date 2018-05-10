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
        <ul className="profile-info">
          <li className="profile-info-first">
            <div>{this.props.user.username}</div>
            <button type="button">New Post</button>
            <button type="button" onClick={this.props.logout}>Logout</button>
          </li>
          <li className="profile-info-second">
            0 posts boiii
          </li>
          <li className="profile-info-third">
            BIO
          </li>
        </ul>

      </div>
    );
  }


}
