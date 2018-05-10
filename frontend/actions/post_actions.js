import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';

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
    });
  };
};
