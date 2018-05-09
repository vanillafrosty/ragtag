import React from 'react';


const PostIndexItem = (props) => {

  return (
    <li className="post-index-item">
      <img className="post-index-item-image" src={props.post.img_url} />
      <br />
      <h3>{props.post.body}</h3>
    </li>
  )

};


export default PostIndexItem;
