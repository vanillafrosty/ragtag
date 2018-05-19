import React from 'react';
import { Link } from 'react-router-dom';

const PostModalProfile = (props) => {

  return (
    <div className="post-modal-profile">
      <div className="post-modal-profile-pic">
        <Link to={`/user/${props.user.id}`} onClick={props.closeModal}>
          <img src={props.user.avatar_url} />
        </Link>
      </div>
      <Link to={`/user/${props.user.id}`} onClick={props.closeModal}>
        <div className="post-modal-profile-name">{props.user.username}</div>
      </Link>
    </div>
  );

};


export default PostModalProfile;
