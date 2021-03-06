import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_INDEX, CLEAR_POSTS, REMOVE_POST, ADD_INDEX } from '../actions/post_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import merge from 'lodash/merge';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case CLEAR_POSTS:
      return {};
    case RECEIVE_POSTS:
    case RECEIVE_INDEX:
      if (action.posts === undefined) {
        return {};
      } else {
        return action.posts;
      }
    case ADD_INDEX:
      return merge({}, state, action.posts);
    case RECEIVE_POST:
      let nextState = merge({}, state);
      nextState[action.post.id] = action.post;
      return nextState;
    case RECEIVE_LIKE:
      nextState = merge({}, state);
      let user_id = action.like.user_id;
      let likes = nextState[action.like.post_id].likes;
      likes.push(user_id);
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      user_id = action.like.user_id;
      likes = nextState[action.like.post_id].likes;
      let user_index = likes.indexOf(user_id);
      likes.splice(user_index, 1);
      return nextState;
    case REMOVE_POST:
      nextState = merge({}, state);
      delete nextState[action.id];
      return nextState;
    case RECEIVE_COMMENT:
      nextState = merge({}, state);
      nextState[action.comment.post_id].comments.push(action.comment.id);
      return nextState;
    default:
      return state;
  }
};


export default postsReducer;
