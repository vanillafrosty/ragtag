import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleEdit = this.handleEdit.bind(this);
  }


  handleEdit(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const followPrompt = this.props.followed ? 'Unfollow' : 'Follow';
    console.log(this.state.editing);
    return (
      <div className="profile-info-container">
        <div className="profile-pic">
          <img src={this.props.user.avatar_url} />
        </div>
        <ul className="profile-info">
          <li className="profile-info-first">
            <div className="user-text">{this.props.user.username}</div>
            {this.props.user.id === this.props.currentUser ? (<button type="button" onClick={this.handleEdit}>Edit Bio</button>) :
              (<button type="button" onClick={this.props.createFollow}>{followPrompt}</button>)}
            {this.props.user.id === this.props.currentUser ? <button type="button" onClick={this.props.openCreateModal}>New Post</button> : ''}
            {this.props.user.id === this.props.currentUser ? <button type="button" onClick={this.props.logout}>Logout</button> : ''}
          </li>
          <li className="profile-info-second">
            <div className="profile-text">{`${this.props.posts.length} posts`}</div>
            <div className="profile-text">{`${this.props.user.follows.length} followers`}</div>
          </li>
          <li className="profile-info-third">
            BIO HERE
          </li>
        </ul>

      </div>
    );
  }

}
