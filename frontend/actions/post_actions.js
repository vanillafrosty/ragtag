import * as ApiUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';
export const RECEIVE_INDEX = 'RECEIVE_INDEX';
export const CLEAR_POSTS = 'CLEAR_POSTS';
export const REMOVE_POST = 'REMOVE_POST';


export const removePost = (post) => {
  return {
    type: REMOVE_POST,
    id: post.id
  };
};

export const receivePosts = (data) => {
  return {
    type: RECEIVE_POSTS,
    posts: data.posts
  };
};


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

// export const fetchPosts = (params) => {
//   return (dispatch) => {
//     return ApiUtil.fetchPosts(params).then( data => {
//       return dispatch(receivePosts(data));
//     });
//   };
// };

export const fetchIndex = () => {
  return (dispatch) => {
    return ApiUtil.fetchPosts({ type: 'index' }).then( data => {
      return dispatch(receiveIndex(data));
    });
  };
}

export const fetchExplore = () => {
  return (dispatch) => {
    return ApiUtil.fetchPosts({ type: 'explore' }).then( data => {
      return dispatch(receiveIndex(data));
    });
  };
};

export const fetchUserShow = (params) => {
  return (dispatch) => {
    return ApiUtil.fetchPosts(params).then( data => {
      return dispatch(receiveIndex(data));
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

export const updatePost = (post) => {
  return (dispatch) => {
    return ApiUtil.updatePost(post).then( post => {
      return dispatch(receivePost(post));
    });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    return ApiUtil.removePost(id).then( post => {
      return dispatch(removePost(post));
    });
  };
};
