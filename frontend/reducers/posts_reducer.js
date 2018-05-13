import { RECEIVE_POSTS, RECEIVE_POST } from '../actions/post_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
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
    case RECEIVE_LIKE:
      nextState = merge({}, state);
      let user_id = action.post.user_id;
      let likes = nextState[action.post.id].likes;
      likes.push(user_id);
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      user_id = action.post.user_id;
      likes = nextState[action.post.id].likes;
      let user_index = likes.indexOf(user_id);
      likes.splice(user_index, 1);
      return nextState;    
    default:
      return state;
  }
};


export default postsReducer;
