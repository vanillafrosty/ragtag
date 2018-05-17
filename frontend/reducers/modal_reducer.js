import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { REMOVE_POST } from '../actions/post_actions';

const initialState = {
  status: null,
  postId: null
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case REMOVE_POST:
    case CLOSE_MODAL:
      return {
        status: null,
        postId: null
      }
    default:
      return state;
  }
}
