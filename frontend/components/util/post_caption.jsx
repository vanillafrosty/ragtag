import React from 'react';
import { Link } from 'react-router-dom';

const PostCaption = (props) => {
  return (
    <li id="post-caption">
      <Link to={`/user/${props.user.id}`} onClick={props.closeModal}><h3 className="comment-text-name">{props.user.username}</h3></Link>
      <h3 className="comment-text">{props.post.body}</h3>
    </li>
  );

};

export default PostCaption;
