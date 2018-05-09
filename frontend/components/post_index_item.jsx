import React from 'react';


const PostIndexItem = (props) => {

  return (
    <li>
      <img src={props.post.img_url} />
      <br />
      <h3>{props.post.body}</h3>
    </li>
  )

};


export default PostIndexItem;
