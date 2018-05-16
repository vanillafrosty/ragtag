import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      bio: this.props.user.bio
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleEdit(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing,
      bio: this.props.user.bio
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      bio: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.updateUser({ id: this.props.currentUser, bio: this.state.bio });
      this.setState({ editing: false });
    }
  }

  render() {
    const followPrompt = this.props.followed ? 'Unfollow' : 'Follow';
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
            {this.state.editing === false ? <h3 className="profile-bio">{this.props.user.bio}</h3> :
              <textarea className="profile-bio-edit" maxLength="280"
                onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={this.state.bio}>
              </textarea>
            }
          </li>
        </ul>

      </div>
    );
  }

}
