import merge from 'lodash/merge';

import { RECEIVE_INDEX } from '../actions/post_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/follow_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_FOLLOW:
      let nextState = merge({}, state);
      nextState = merge({}, state);
      let follower_id = action.follow.follower_id;
      let follows = nextState[action.follow.followee_id].follows;
      follows.push(follower_id);
      return nextState;
    case REMOVE_FOLLOW:
      nextState = merge({}, state);
      follower_id = action.follow.follower_id;
      follows = nextState[action.follow.followee_id].follows;
      let follower_index = follows.indexOf(follower_id);
      follows.splice(follower_index, 1);
      return nextState;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_INDEX:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
