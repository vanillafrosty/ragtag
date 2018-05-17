import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      editing: false,
      body: '',
      post_id: this.props.post.id
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
      editing: !this.state.editing
    });
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
          <div className="down-button" onClick={this.handleEdit}><i className="fas fa-chevron-down fa-lg"></i></div>
          {this.state.editing === false ? '' :
            <ul className="down-dropdown">
              <li className="down-dropdown-button-li">Edit</li>
              <li className="down-dropdown-button-li">Delete</li>
            </ul>}
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
                <h3 className="comment-text-name">{this.props.currentUser.username}</h3><h3 className="comment-text">{this.props.post.body}</h3>
              </li>
              {comments}
            </ul>
            <div className="comment-submit">
              <textarea className="comment-textarea" maxLength="280" placeholder="Add a comment..."
                onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={this.state.body}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
