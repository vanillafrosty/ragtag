import React from 'react';
import { Link } from 'react-router-dom';


const SidebarContainer = (props) => {

  return (
    <div className="sidebar-container">
      <div className="sidebar-profile">
        <div className="sidebar-profile-pic">
          <img src={props.user.avatar_url} />
        </div>
        <Link to={`/user/${props.user.id}`}>
          <div className="sidebar-profile-name">{props.user.username}</div>
        </Link>
      </div>
      <div className="sidebar-divide"></div>
      <ul className="sidebar-info">
        <li className="sidebar-info-first">
          <div className="sidebar-text">{`${props.user.follows.length} followers`}</div>
        </li>
      </ul>
    </div>
  );

}

export default SidebarContainer;
