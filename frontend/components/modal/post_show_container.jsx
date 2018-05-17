import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCaptionKeyDown = this.handleCaptionKeyDown.bind(this);
    this.state = {
      dropDown: false,
      editing: false,
      commentBody: '',
      captionBody: this.props.post.body,
      post_id: this.props.post.id,
      dropDownClass: "down-button"
    };
  }

  componentDidMount() {
    this.props.fetchCommentsAndUsers(this.props.post.id);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  handleLike(e) {
    e.preventDefault();
    this.props.createLike(this.props.post.id);
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


  handleCaptionKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.updatePost({
        id: this.state.post_id,
        body: this.state.captionBody
      });
      this.setState({ editing: false });
    };
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
          <div className={this.state.dropDownClass} onClick={this.handleDrop}>
            <i className="fas fa-chevron-down fa-lg"></i>
          </div>
          {this.state.dropDown === false ? '' :
            <ul className="down-dropdown">
              <li className="down-dropdown-button-li" onClick={this.handleEdit}>Edit</li>
              <li className="down-dropdown-button-li">Delete</li>
            </ul>}
          <div className="post-delete-container">
            <div className="post-delete-prompt">Are you sure you want to delete this post?</div>
            <ul className="post-delete-buttons">
              <li className="post-delete-buttons-li">Yes</li>
              <li className="post-delete-buttons-li">Cancel</li>
            </ul>
          </div>
          <div className="post-modal-profile">
            <div className="post-modal-profile-pic">
              <img src={this.props.currentUser.avatar_url} />
            </div>
            <div className="post-modal-profile-name">{this.props.currentUser.username}</div>
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
                {this.state.editing === false ? <span className="post-show-sidebar-info-span"><h3 className="comment-text-name">{this.props.currentUser.username}</h3><h3 className="comment-text">{this.props.post.body}</h3></span> :
                  <textarea className="post-show-edit" maxLength="280" placeholder="Caption..." value={this.state.captionBody}
                    onKeyDown={this.handleCaptionKeyDown} onChange={this.handleChange('captionBody')}>
                  </textarea>
                }
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
