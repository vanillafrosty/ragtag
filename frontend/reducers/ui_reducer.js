import { TOGGLE_MODAL } from '../actions/ui_actions';

const uiReducer = (state = { modal: false }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case TOGGLE_MODAL:
      return { modal: !state.modal };
    default:
      return state;
  }
};

export default uiReducer;
