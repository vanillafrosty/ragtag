export const selectPostComments = (post, comments, users) => {
  let post_comments = [];
  for (let i=0; i<post.comments.length; i++){
    let comment = comments[post.comments[i]];
    //return [] if we have no comments in state. mostly needed for leaving
    //the user show page and going to the index, because we will have posts
    //but no comments. note that we are running clearPosts when leaving the
    //user show, but because it's asynch, we will run this function (the index
    //will begin rendering) before the posts are actually cleared,
    //so comments[post.comments[i]] for any of our posts will fail. 
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
