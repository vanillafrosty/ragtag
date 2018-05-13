import * as APIUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';


export const receiveFollow = (follow) => {
  return {
    type: RECEIVE_FOLLOW,
    follow: follow
  };
};

export const removeFollow = (follow) => {
  return {
    type: REMOVE_FOLLOW,
    follow: follow
  };
};

export const createFollow = (id) => {
  return (dispatch) => {
    return APIUtil.createFollow(id).then( follow => {
      return dispatch(receiveFollow(follow));
    }, err => {
      return dispatch(deleteFollow(id));
    });
  };
};

export const deleteFollow = (id) => {
  return (dispatch) => {
    return APIUtil.removeFollow(id).then( follow => {
      return dispatch(removeFollow(follow));
    });
  };
};
