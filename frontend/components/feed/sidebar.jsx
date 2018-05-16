import React from 'react';
import { Link } from 'react-router-dom';


const SidebarContainer = (props) => {

  return (
    <div className="sidebar-container">
      <div className="sidebar-profile">
        <Link to={`/user/${props.user.id}`}>
          <div className="sidebar-profile-pic">
            <img src={props.user.avatar_url} />
          </div>
        </Link>
        <Link to={`/user/${props.user.id}`}>
          <div className="feed-profile-name">{props.user.username}</div>
        </Link>
      </div>
      <div className="sidebar-divide"></div>
      <ul className="sidebar-info">
        <li className="sidebar-info-first">
          <div className="sidebar-text">Following</div>
        </li>
      </ul>
    </div>
  );

}

export default SidebarContainer;
