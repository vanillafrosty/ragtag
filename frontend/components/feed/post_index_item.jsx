import React from 'react';


const PostIndexItem = (props) => {

  return (
    <li className="post-index-item">
      <img className="post-index-item-image" src={props.post.img_url} />
      <br />
      <h3>{props.post.body}</h3>
      <h3>number of likes: {props.post.likes.length}</h3>
      <h3 onClick={(e) => { props.createLike(props.post.id) }}>LIKE/UNLIKE</h3>
    </li>
  )

};


export default PostIndexItem;
