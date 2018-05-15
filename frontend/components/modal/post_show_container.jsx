import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCommentsAndUsers(this.props.post.id);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  handleClick(e) {
    e.preventDefault();
    this.props.createLike(this.props.post.id);
  }

  render() {
    const comments = this.props.comments.map((comment, id) => {
      return (
        <li key={id}>
          <h3 className="comment-text-name">{comment.username}</h3>
          <h3 className="comment-text">{comment.body}</h3>
        </li>
      );
    });
    const heartColor = this.props.liked ? "sidebar-icon-red" : "sidebar-icon";
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
              <div className={heartColor} onClick={this.handleClick}><i className="fas fa-heart fa-lg"></i></div>
              <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
            </li>
            <li className="post-show-sidebar-info-second">
              <h3>{this.props.post.likes.length} likes</h3>
            </li>
            <li id="post-show-sidebar-info-third">
              <h3 className="comment-text-name">{this.props.user.username}</h3><h3 className="comment-text">{this.props.post.body}</h3>
            </li>
            {comments}
          </ul>
        </div>
      </div>
    );
  }

}
