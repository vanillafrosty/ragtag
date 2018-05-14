import React from 'react';
import { Link } from 'react-router-dom';


const SidebarContainer = (props) => {

  return (
    <div className="sidebar-container">
      <h1>THIS IS A SIDEBAR</h1>
      <div className="sidebar-profile">
        <div className="sidebar-profile-pic">
          <img src={props.user.avatar_url} />
        </div>
        <div className="sidebar-profile-name">{props.user.username}</div>
      </div>
      <ul className="sidebar-info">
        <li className="sidebar-info-first">
          {`${props.posts.length} posts`}
          {`${props.user.follows.length} followers`}
        </li>
        <li className="sidebar-info-second">
          <Link to={`/user/${props.user.id}`}>
            <button type="button">Profile</button>
          </Link>
        </li>
      </ul>
    </div>
  );

}

export default SidebarContainer;
