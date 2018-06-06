import React from 'react';
import { Link } from 'react-router-dom';
import PostModalProfile from './post_modal_profile';
import PostCaption from '../util/post_caption';

export default class PostExplore extends React.Component {

  constructor(props){
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      commentBody: '',
      post_id: this.props.post.id,
    };
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

    const comments = this.props.postComments.map((comment, id) => {
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
          <PostModalProfile user={currentUser} closeModal={this.props.closeModal} />
          <div className="post-show-divide"></div>
          <div className="post-show-all-text">
            <ul className="post-show-sidebar-info">
              <li className="post-show-sidebar-info-first">
                <div className={heartColor} onClick={this.handleLike()}><i className="fas fa-heart fa-lg"></i></div>
                <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
              </li>
              <li className="post-show-sidebar-info-second">
                <h3>{`${this.props.post.likes.length} ${this.props.post.likes.length !== 1 ? 'likes':'like'}`}</h3>
              </li>
              <PostCaption user={currentUser} post={this.props.post} closeModal={this.props.closeModal} />
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
