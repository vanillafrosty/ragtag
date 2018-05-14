import React from 'react';


const PostIndexItem = (props) => {
  const heartColor = props.liked ? "sidebar-icon-red" : "sidebar-icon";
  return (
    <div className="post-index-item">
      <div className="post-index-profile">
        <div className="post-index-profile-pic">
          <img src={props.post.img_url} />
        </div>
        <div className="post-index-profile-name">{props.post.body}</div>
      </div>
      <div className="post-index-image">
        <img className="post-index-image-preview" src={props.post.img_url} />
      </div>
      <ul className="post-index-info">
        <li className="post-index-info-first">
          <div className={heartColor} onClick={(e) => { props.createLike(props.post.id) }}><i className="fas fa-heart fa-lg"></i></div>
          <div className="sidebar-icon"><i className="far fa-comment fa-lg"></i></div>
        </li>
        <li className="post-index-info-second">
          <h3>{props.post.likes.length} likes</h3>
        </li>
        <li className="post-index-info-third">
          <h3>{props.post.body}</h3>
        </li>
      </ul>
    </div>
  )

};


export default PostIndexItem;
