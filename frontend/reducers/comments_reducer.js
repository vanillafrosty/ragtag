import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_INDEX } from '../actions/post_actions';
import merge from 'lodash/merge';


const commentsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_INDEX:
      return action.comments;
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      let nextState = merge({}, state);
      nextState[action.comment.id] = action.comment;
      return nextState;
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      delete nextState[action.comment.id];
      return nextState;
    default:
      return state;
  }
};

export default commentsReducer;
