import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';


export const receiveLike = (post) => {
  return {
    type: RECEIVE_LIKE,
    post: post
  };
};

export const removeLike = (post) => {
  return {
    type: REMOVE_LIKE,
    post: post
  };
};

export const createLike = (id) => {
  return (dispatch) => {
    return APIUtil.createLike(id).then( post => {
      return dispatch(receiveLike(post));
    });
  };
};

export const deleteLike = (id) => {
  return (dispatch) => {
    return APIUtil.removeLike(id).then( post => {
      return dispatch(removeLike(post));
    });
  };
};
