import { RECEIVE_POST_ERRORS, RECEIVE_POST, CLEAR_POST_ERRORS } from '../actions/post_actions';

const postErrorsReducer = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;
    case RECEIVE_POST:
      return [];
    case CLEAR_POST_ERRORS:
      return [];
    default:
      return state;
  }
}

export default postErrorsReducer;
