import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = (props) => {

    const posts = props.posts.map( post => {
      return <PostIndexItem key={post.id} post={post} createLike={props.createLike}
        liked={post.likes.includes(props.currentUser.id)} user={props.users[post.user_id]} />
    });

    return (
      <div className="post-index-container">
        {posts}
      </div>
    );
}

export default PostIndex;
