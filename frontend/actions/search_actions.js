import * as APIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH_USERS = 'RECEIVE_SEARCH_USERS';
export const CLEAR_SEARCH_USERS = 'CLEAR_SEARCH_USERS';

export const receiveSearchUsers = (users) => {
  return {
    type: RECEIVE_SEARCH_USERS,
    users: users
  };
};

export const fetchSearchUsers = (searchStr) => {
  return (dispatch) => {
    return APIUtil.searchUsers(searchStr).then( users => {
      return dispatch(receiveSearchUsers(users));
    });
  };
};

export const clearSearchUsers = () => {
  return {
    type: CLEAR_SEARCH_USERS
  };
};
