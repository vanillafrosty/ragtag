import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';
export const RECEIVE_POSTS_AND_USERS = 'RECEIVE_POSTS_AND_USERS';

//action creator used when fetching posts from user show page
export const receivePosts = (data) => {
  return {
    type: RECEIVE_POSTS,
    posts: data.posts
  };
};

//action creator used when fetching posts for the current user's
//index page
export const receivePostsAndUsers = (data) => {
  return {
    type: RECEIVE_POSTS_AND_USERS,
    posts: data.posts,
    users: data.users
  };
};

export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post: post
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_POST_ERRORS,
    errors: errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_POST_ERRORS
  };
};

export const fetchPosts = (params) => {
  return (dispatch) => {
    return ApiUtil.fetchPosts(params).then( data => {
      return dispatch(receivePosts(data));
    });
  };
};

export const fetchPostsAndUsers = (params) => {
  return (dispatch) => {
    return ApiUtil.fetchPosts(params).then( data => {
      return dispatch(receivePostsAndUsers(data));
    });
  };
}

export const createPost = (post) => {
  return (dispatch) => {
    return ApiUtil.createPost(post).then( post => {
      return dispatch(receivePost(post));
    }, err => {
      return dispatch(receiveErrors(err.responseJSON));
    });
  };
};
