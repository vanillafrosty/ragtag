import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    return ApiUtil.fetchPosts().then( posts => {
      return dispatch(receivePosts(posts));
    });
  };
};
