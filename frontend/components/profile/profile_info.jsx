import React from 'react';


const ProfileInfo = (props) => {

  const followPrompt = props.followed ? 'Unfollow' : 'Follow';

  return (
    <div className="profile-info-container">
      <div className="profile-pic">
        <img src={props.user.avatar_url} />
      </div>
      <ul className="profile-info">
        <li className="profile-info-first">
          <div className="user-text">{props.user.username}</div>
          {props.user.id === props.currentUser ? '' : (<button type="button" onClick={props.createFollow}>{followPrompt}</button>)}
          <button type="button" onClick={props.openCreateModal}>New Post</button>
          <button type="button" onClick={props.logout}>Logout</button>
        </li>
        <li className="profile-info-second">
          <div className="profile-text">{`${props.posts.length} posts`}</div>
          <div className="profile-text">{`${props.user.follows.length} followers`}</div>
        </li>
        <li className="profile-info-third">
          BIO HERE
        </li>
      </ul>

    </div>
  );
};

export default ProfileInfo;
