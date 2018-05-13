import React from 'react';


const ProfileInfo = (props) => {
  return (
    <div className="profile-info-container">
      <div className="profile-pic">
        <img src={props.user.avatar_url} />
      </div>
      <ul className="profile-info">
        <li className="profile-info-first">
          <div className="user-text">{props.user.username}</div>
          <button type="button" onClick={props.openCreateModal}>New Post</button>
          <button type="button" onClick={props.logout}>Logout</button>
        </li>
        <li className="profile-info-second">
          {`${props.posts.length} posts`}
        </li>
        <li className="profile-info-third">
          BIO HERE
        </li>
      </ul>

    </div>
  );
};

export default ProfileInfo;
