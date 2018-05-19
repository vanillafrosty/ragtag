import React from 'react';
import { Link } from 'react-router-dom';

export default class PostExploreContainer extends React.Component {

  constructor(props){
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      commentBody: '',
      post_id: this.props.post.id,
    };
  }


  handleLike(e) {
    e.preventDefault();
    this.props.createLike(this.props.post.id);
  }


  handleChange(key) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [key]: e.target.value
      });
    };
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.createComment({
        post_id: this.state.post_id,
        body: this.state.commentBody
      });
      this.setState({ commentBody: '' });
    }
  }


  render() {
    let post_comments = [];
    for (let i=0; i<this.props.post.comments.length; i++) {
      let comment = this.props.comments[this.props.post.comments[i]];
      if (comment === undefined) {
        break;
      }
      post_comments.push({
        username: this.props.users[comment.user_id].username,
        user_id: comment.user_id,
        body: comment.body
      });
    };

    const comments = post_comments.map((comment, id) => {
      return (
        <li key={id}>
          <Link to={`/user/${comment.user_id}`} onClick={this.props.closeModal}><h3 className="comment-text-name">{comment.username}</h3></Link>
          <h3 className="comment-text">{comment.body}</h3>
        </li>
      );
    });

    const heartColor = this.props.liked ? "sidebar-icon-red" : "sidebar-icon";

    const currentUser = this.props.users[this.props.post.user_id];

    return (
      <div className="post-show-container">
        <div className="post-show-image">
          <img className="post-show-image-preview" src={this.props.post.img_url} />
        </div>
        <div className="post-show-side">
          <div className="post-modal-profile">
            <div className="post-modal-profile-pic">
              <Link to={`/user/${currentUser.id}`} onClick={this.props.closeModal}><img src={currentUser.avatar_url} /></Link>
            </div>
            <Link to={`/user/${currentUser.id}`} onClick={this.props.closeModal}><div className="post-modal-profile-name">{currentUser.username}</div></Link>
          </div>
          <div className="post-show-divide"></div>
          <div className="post-show-all-text">
            <ul className="post-show-sidebar-info">
              <li className="post-show-sidebar-info-first">
                <div className={heartColor} onClick={this.handleLike}><i className="fas fa-heart fa-lg"></i></div>
                <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
              </li>
              <li className="post-show-sidebar-info-second">
                <h3>{this.props.post.likes.length} likes</h3>
              </li>
              <li id="post-show-sidebar-info-third">
                <span className="post-show-sidebar-info-span">
                  <Link to={`/user/${currentUser.id}`} onClick={this.props.closeModal}><h3 className="comment-text-name">{currentUser.username}</h3></Link>
                  <h3 className="comment-text">{this.props.post.body}</h3>
                </span>
              </li>
              {comments}
            </ul>
            <div className="comment-submit">
              <textarea className="comment-textarea" maxLength="280" placeholder="Add a comment..."
                onKeyDown={this.handleKeyDown} onChange={this.handleChange('commentBody')} value={this.state.commentBody}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

}