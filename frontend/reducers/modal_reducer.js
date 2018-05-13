import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const initialState = {
  status: null,
  postId: null
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return {
        status: null,
        postId: null
      }
    default:
      return state;
  }
}
