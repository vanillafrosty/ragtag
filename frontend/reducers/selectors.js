export const selectPostComments = (post, comments, users) => {
  let post_comments = [];
  for (let i=0; i<post.comments.length; i++){
    let comment = comments[post.comments[i]];
    //break out of the function in the case where we have no comments in state
    //but are trying to run the code below. at first glance this is fine
    //if we have no posts (we are clearing posts when going to the index), since
    //it'd seem like we'd never get into this map function,
    //but the component will try to render before the clear posts action finishes.
    //note that even if we had comments in the state (navigating from index to user show),
    //navigating back to index still might break because the comments are the index posts'
    //comments and not the user show page's comments
    if (comment === undefined) {
      return [];
    }
    post_comments.push({
      username: users[comment.user_id].username,
      user_id: comment.user_id,
      body: comment.body
    });
  };
  return post_comments;
};

export const selectFollowed = (users, user) => {
  if (typeof users === 'undefined' || typeof user.followedUsers === 'undefined') {
    return [];
  };
  let followed = [];
  for (let i=0; i<user.followedUsers.length; i++) {
    followed.push(users[user.followedUsers[i]]);
  };
  return followed;
};
