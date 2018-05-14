import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.createLike(this.props.post.id);
  }

  render() {
    const heartColor = this.props.liked ? "sidebar-icon-red" : "sidebar-icon";
    const heartClass = this.props.liked ? "fas fa-heart fa-lg" : "far fa-heart fa-lg";
    return (
      <div className="post-show-container">
        <div className="post-show-image">
          <img className="post-show-image-preview" src={this.props.post.img_url} />
        </div>
        <div className="post-show-side">
          <div className="post-show-profile">
            <div className="post-show-profile-pic">
              <img src={this.props.user.avatar_url} />
            </div>
            <div className="post-show-profile-name">{this.props.user.username}</div>
          </div>
          <div className="post-show-divide"></div>
          <ul className="post-show-sidebar-info">
            <li className="post-show-sidebar-info-first">
              <h3>{this.props.post.body}</h3>
            </li>
            <li className="post-show-sidebar-info-second">
              <div className={heartColor} onClick={this.handleClick}><i className={heartClass}></i></div>
              <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
            </li>
            <li className="post-show-sidebar-info-third">
              <h3>{this.props.post.likes.length} likes</h3>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
