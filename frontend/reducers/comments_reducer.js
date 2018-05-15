import { RECEIVE_COMMENT, RECEIVE_COMMENTS,
  REMOVE_COMMENT, CLEAR_COMMENTS,
  RECEIVE_COMMENTS_AND_USERS } from '../actions/comment_actions';
import { RECEIVE_INDEX } from '../actions/post_actions';
import merge from 'lodash/merge';


const commentsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_INDEX:
      if (action.comments === undefined) {
        return {};
      } else {
        return action.comments;
      }
    case RECEIVE_COMMENTS_AND_USERS:
      return action.comments;
    case RECEIVE_COMMENT:
      let nextState = merge({}, state);
      nextState[action.comment.id] = action.comment;
      return nextState;
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      delete nextState[action.comment.id];
      return nextState;
    case CLEAR_COMMENTS:
      return {};
    default:
      return state;
  }
};

export default commentsReducer;
