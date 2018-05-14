import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = (props) => {

    const posts = props.posts.map( post => {
      return <PostIndexItem key={post.id} post={post} createLike={props.createLike} />
    });

    return (
      <div className="post-index">
        <ul>
          {posts}
        </ul>
      </div>
    );
}

export default PostIndex;
