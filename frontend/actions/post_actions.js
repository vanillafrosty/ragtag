import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';
export const RECEIVE_INDEX = 'RECEIVE_INDEX';
export const CLEAR_POSTS = 'CLEAR_POSTS';

//action creator used when fetching posts from user show page
export const receivePosts = (data) => {
  return {
    type: RECEIVE_POSTS,
    posts: data.posts
  };
};

//action creator used when fetching posts for the current user's
//index page
export const receiveIndex = (data) => {
  return {
    type: RECEIVE_INDEX,
    posts: data.posts,
    users: data.users,
    comments: data.comments
  };
};

export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post: post
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
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

export const fetchIndex = (params) => {
  return (dispatch) => {
    return ApiUtil.fetchPosts(params).then( data => {
      return dispatch(receiveIndex(data));
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

export const updatePost = (post) => {
  return (dispatch) => {
    return ApiUtil.updatePost(post).then( post => {
      return dispatch(receivePost(post));
    });
  };
}
