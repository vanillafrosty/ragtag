import React from 'react';
import { Link } from 'react-router-dom';
import PostModalProfile from './post_modal_profile';
import PostCaption from '../util/post_caption';

export default class PostShow extends React.Component {

  constructor(props){
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleCommentKeyDown = this.handleCommentKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeletePrompt = this.handleDeletePrompt.bind(this);
    this.handleCaptionKeyDown = this.handleCaptionKeyDown.bind(this);
    this.handleRemovePost = this.handleRemovePost.bind(this);
    this.state = {
      dropDown: false,
      deleting: false,
      editing: false,
      commentBody: '',
      captionBody: this.props.post.body,
      post_id: this.props.post.id,
      dropDownClass: "down-button"
    };
    this.focusTextarea = this.focusTextarea.bind(this);
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

  handleEdit(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing,
      dropDown: !this.state.dropDown,
      captionBody: this.props.post.body,
      dropDownClass: "down-button rotate"
    });
  }

  handleDeletePrompt(e) {
    e.preventDefault();
    if (this.state.deleting) {
      this.setState({
        deleting: !this.state.deleting
      });
    } else {
      this.setState({
        deleting: !this.state.deleting,
        dropDown: !this.state.dropDown,
        dropDownClass: "down-button"
      });
    }
  }

  handleRemovePost(e) {
    e.preventDefault();
    this.props.deletePost(this.props.post.id).then( success => {
      this.props.closeModal();
    });
  }

  handleDrop(e) {
    //DO NOT drop down the actual menu if we're clicking the drop
    //and the bio is in edit mode!!!
    e.preventDefault();
    if (this.state.editing) {
      this.setState({
        editing: !this.state.editing,
        dropDownClass: "down-button"
      });
    } else if (this.state.dropDownClass === "down-button") {
      this.setState({
        dropDownClass: "down-button rotate",
        dropDown: !this.state.dropDown
      });
    } else {
      this.setState({
        dropDownClass: "down-button",
        dropDown: !this.state.dropDown
      });
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

  handleCommentKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.state.commentBody.length > 0) {
        this.props.createComment({
          post_id: this.state.post_id,
          body: this.state.commentBody
        });
      }
      this.setState({ commentBody: '' });
    }
  }


  handleCaptionKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.updatePost({
        id: this.state.post_id,
        body: this.state.captionBody
      });
      this.setState({
        editing: false,
        dropDownClass: "down-button"
      });
    };
  }

  focusTextarea() {
    const textArea = document.getElementById(this.state.post_id + '');
    textArea.focus();
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

    const sameUser = (this.props.currentUser.id === this.props.sessionUser.id);

    return (
      <div className="post-show-container">
        <div className="post-show-image">
          <img className="post-show-image-preview" src={this.props.post.img_url} />
        </div>
        <div className="post-show-side">
          {!sameUser ? '' :
            <div className={this.state.dropDownClass} onClick={this.handleDrop}>
              <i className="fas fa-chevron-down fa-lg"></i>
            </div>}
          {this.state.dropDown === false ? '' :
            <ul className="down-dropdown">
              <li className="down-dropdown-button-li" onClick={this.handleEdit}>Edit</li>
              <li className="down-dropdown-button-li" onClick={this.handleDeletePrompt}>Delete</li>
            </ul>}
          {this.state.deleting === false? '' :
            <div className="post-delete-container">
              <div className="post-delete-prompt">Are you sure you want to delete this post?</div>
              <ul className="post-delete-buttons">
                <li className="post-delete-buttons-li" onClick={this.handleRemovePost}>Yes</li>
                <li className="post-delete-buttons-li" onClick={this.handleDeletePrompt}>Cancel</li>
              </ul>
            </div>}
          <PostModalProfile user={this.props.currentUser} closeModal={this.props.closeModal} />
          <div className="post-show-divide"></div>
          <div className="post-show-all-text">
            <ul className="post-show-sidebar-info">
              <li className="post-show-sidebar-info-first">
                <div className={heartColor} onClick={this.handleLike()}><i className="fas fa-heart fa-lg"></i></div>
                <div className="sidebar-icon" onClick={this.focusTextarea}><i className="far fa-comment fa-lg"></i></div>
              </li>
              <li className="post-show-sidebar-info-second">
                <h3>{`${this.props.post.likes.length} ${this.props.post.likes.length !== 1 ? 'likes':'like'}`}</h3>
              </li>
              {this.state.editing === false ?
                <PostCaption user={this.props.currentUser} closeModal={this.props.closeModal} post={this.props.post} /> :
                <li id="post-caption">
                  <textarea className="post-show-edit" maxLength="280" placeholder="Caption..." value={this.state.captionBody}
                    onKeyDown={this.handleCaptionKeyDown} onChange={this.handleChange('captionBody')}>
                  </textarea>
                </li>
                }
              {comments}
            </ul>
            <div className="comment-submit">
              <textarea id={this.state.post_id} className="comment-textarea" maxLength="280" placeholder="Add a comment..."
                onKeyDown={this.handleCommentKeyDown} onChange={this.handleChange('commentBody')} value={this.state.commentBody}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
