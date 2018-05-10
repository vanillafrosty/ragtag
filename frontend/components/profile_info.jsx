import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="profile-info-container">
        <div className="profile-pic">
        </div>
        <ul className="profile-info">
          <li className="profile-info-first">
            <div className="user-text">{this.props.user.username}</div>
            <button type="button">New Post</button>
            <button type="button" onClick={this.props.logout}>Logout</button>
          </li>
          <li className="profile-info-second">
            {`${this.props.posts.length} posts`}
          </li>
          <li className="profile-info-third">
            BIO HERE
          </li>
        </ul>

      </div>
    );
  }


}
