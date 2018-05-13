import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';


export const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    like: like
  };
};

export const removeLike = (like) => {
  return {
    type: REMOVE_LIKE,
    like: like
  };
};

export const createLike = (id) => {
  return (dispatch) => {
    return APIUtil.createLike(id).then( like => {
      return dispatch(receiveLike(like));
    }, err => {
      return dispatch(deleteLike(id));
    });
  };
};

export const deleteLike = (id) => {
  return (dispatch) => {
    return APIUtil.removeLike(id).then( like => {
      return dispatch(removeLike(like));
    });
  };
};
