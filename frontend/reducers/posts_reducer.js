import { RECEIVE_POSTS, RECEIVE_POST } from '../actions/post_actions';
import merge from 'lodash/merge';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      let nextState = merge({}, state);
      nextState[action.post.id] = action.post;
      return nextState;
    default:
      return state;
  }
};


export default postsReducer;
