import React from 'react';
import { Link } from 'react-router-dom';

const PostIndexItem = (props) => {

  const comments = props.postComments.map((comment, id) => {
    return (
      <li key={id}>
        <h3 className="comment-text-name">{comment.username}</h3>
        <h3 className="comment-text">{comment.body}</h3>
      </li>
    );
  });

  const heartColor = props.liked ? "sidebar-icon-red" : "sidebar-icon";
  return (
    <div className="post-index-item">
      <div className="post-index-profile">
        <Link to={`/user/${props.user.id}`}>
          <div className="post-index-profile-pic">
            <img src={props.user.avatar_url} />
          </div>
        </Link>
        <Link to={`/user/${props.user.id}`}>
          <div className="post-index-profile-name">{props.user.username}</div>
        </Link>
      </div>
      <div className="post-index-image">
        <img className="post-index-image-preview" src={props.post.img_url} />
      </div>
      <div className="post-index-all-text">
        <ul className="post-index-info">
          <li className="post-index-info-first">
            <div className={heartColor} onClick={(e) => { props.createLike(props.post.id) }}><i className="fas fa-heart fa-lg"></i></div>
            <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
          </li>
          <li className="post-index-info-second">
            <h3>{props.post.likes.length} likes</h3>
          </li>
          <li id="post-index-info-third">
            <h3 className="comment-text-name">{props.user.username}</h3><h3 className="comment-text">{props.post.body}</h3>
          </li>
          {comments}
        </ul>
        <div className="index-comment-submit">
          <textarea className="index-comment-textarea" maxLength="280" placeholder="Add a comment...">
          </textarea>
        </div>
      </div>
    </div>
  )

};


export default PostIndexItem;
