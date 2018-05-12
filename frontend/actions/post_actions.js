import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts: posts
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

export const fetchPosts = () => {
  return (dispatch) => {
    return ApiUtil.fetchPosts().then( posts => {
      return dispatch(receivePosts(posts));
    });
  };
};

export const createPost = (post) => {
  return (dispatch) => {
    return ApiUtil.createPost(post).then( post => {
      return dispatch(receivePost(post));
    }, err => {
      return dispatch(receiveErrors(err.responseJSON));
    });
  };
};
