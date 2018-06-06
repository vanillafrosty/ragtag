import React from 'react';
import { Link } from 'react-router-dom';
import PostCaption from '../util/post_caption';

export default class PostIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: '',
      post_id: this.props.post.id
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.focusTextarea = this.focusTextarea.bind(this);
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.createComment(this.state);
      this.setState({ body: '' });
    }
  }

  handleLike() {
    if (this.props.liked) {
      return (e) => {
        e.preventDefault();
        this.props.deleteLike(this.props.post.id);
      }
    } else {
      return (e) => {
        e.preventDefault();
        this.props.createLike(this.props.post.id);
      }
    }
  }

  focusTextarea() {
    const textArea = document.getElementById(this.state.post_id + '');
    textArea.focus();
  }

  render() {
    const heartColor = this.props.liked ? "sidebar-icon-red" : "sidebar-icon";
    const comments = this.props.postComments.map((comment, id) => {
      return (
        <li key={id}>
          <Link to={`/user/${comment.user_id}`}><h3 className="comment-text-name">{comment.username}</h3></Link>
          <h3 className="comment-text">{comment.body}</h3>
        </li>
      );
    });
    return (
      <div className="post-index-item">
        <div className="post-index-profile">
          <Link to={`/user/${this.props.user.id}`}>
            <div className="post-index-profile-pic">
              <img src={this.props.user.avatar_url} />
            </div>
          </Link>
          <Link to={`/user/${this.props.user.id}`}>
            <div className="feed-profile-name">{this.props.user.username}</div>
          </Link>
        </div>
        <div className="post-index-image">
          <img className="post-index-image-preview" src={this.props.post.img_url} />
        </div>
        <div className="post-index-all-text">
          <ul className="post-index-info">
            <li className="post-index-info-first">
              <div className={heartColor} onClick={this.handleLike()}><i className="fas fa-heart fa-lg"></i></div>
              <div className="sidebar-icon" onClick={this.focusTextarea}><i className="far fa-comment fa-lg"></i></div>
            </li>
            <li className="post-index-info-second">
              <h3>{`${this.props.post.likes.length} ${this.props.post.likes.length !== 1 ? 'likes':'like'}`}</h3>
            </li>
            <PostCaption user={this.props.user} post={this.props.post} />
            {comments}
          </ul>
          <div className="comment-submit">
            <textarea id={this.state.post_id} className="comment-textarea" maxLength="280" placeholder="Add a comment..."
              onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={this.state.body}>
            </textarea>
          </div>
        </div>
      </div>
    )
  }

};
