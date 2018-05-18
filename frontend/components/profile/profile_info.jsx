import React from 'react';


export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      bio: this.props.user.bio,
      image: null,
      imgUrl: this.props.user.avatar_url
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleEdit(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing,
      bio: this.props.user.bio,
      imgUrl: this.props.user.avatar_url
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

  updateFile(e) {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ image: file, imgUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imgUrl: "", image: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = this.state.image;

    const formData = new FormData();
    formData.append("user[id]", this.props.currentUser);
    if (file) { formData.append("user[avatar]", file); }

    this.props.updateUserPic(formData).then( resp => {
      this.setState({ editing: false });
    });
  }

  render() {
    const followPrompt = this.props.followed ? 'Unfollow' : 'Follow';
    return (
      <div className={this.state.editing === false ? "profile-info-container" : "profile-info-container-edit"}>
        <div className={this.state.editing === false ? "profile-pic" : "profile-pic-edit"}>
          <img src={this.state.editing === false ? this.props.user.avatar_url : this.state.imgUrl} />
          {this.state.editing === false ? '' :
            <div className="profile-pic-edit-buttons">
              <label htmlFor="file-upload" className="profile-file-upload">
                <i className="fas fa-camera-retro"></i> New
              </label>
              <input id="file-upload" type="file" onChange={this.updateFile}/>
              <span onClick={this.handleSubmit}><i className="fas fa-chevron-up"></i></span>
            </div>}
        </div>
        <ul className={this.state.editing === false ? "profile-info" : "profile-info-edit"}>
          <li className="profile-info-first">
            <div className="user-text">{this.props.user.username}</div>
            {this.props.user.id === this.props.currentUser ? (<div className="profile-info-first-svg" onClick={this.handleEdit}><i className="fas fa-cog fa-2x"></i></div>) :
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
              <textarea className="profile-bio-edit" maxLength="280" placeholder="Bio..."
                onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={this.state.bio}>
              </textarea>
            }
          </li>
        </ul>

      </div>
    );
  }

}
