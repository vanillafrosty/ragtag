import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user: user
  };
};

export const fetchUser = (id) => {
  return (dispatch) => {
    return APIUtil.fetchUser(id).then( user => {
      return dispatch(receiveUser(user));
    });
  };
};
