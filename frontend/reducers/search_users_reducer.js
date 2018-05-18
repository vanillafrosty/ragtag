import merge from 'lodash/merge';
import { RECEIVE_SEARCH_USERS } from '../actions/search_actions';

const searchUsersReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_SEARCH_USERS:
      return action.users
    default:
      return state;
  }
};

export default searchUsersReducer;
