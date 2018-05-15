import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = (props) => {

    const posts = props.posts.map( post => {
      let post_comments = [];
      for (let i=0; i<post.comments.length; i++){
        post_comments.push(props.comments[post.comments[i]]);
      };
      return <PostIndexItem key={post.id} post={post} createLike={props.createLike}
        liked={post.likes.includes(props.currentUser.id)} user={props.users[post.user_id]}
        postComments={post_comments} />
    });

    return (
      <div className="post-index-container">
        {posts}
      </div>
    );
}

export default PostIndex;
