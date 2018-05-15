import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = (props) => {

    const posts = props.posts.map( post => {
      let post_comments = [];
      for (let i=0; i<post.comments.length; i++){
        let comment = props.comments[post.comments[i]];
        post_comments.push({
          username: props.users[comment.user_id].username,
          user_id: comment.user_id,
          body: comment.body
        });
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
