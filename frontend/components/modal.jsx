import React from 'react';
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import PostNewContainer from './post_new_container';
import PostShowContainer from './post_show_container';

const Modal = ({modal, closeModal}) => {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'create':
      component = <PostNewContainer closeModal={closeModal} />;
      break;
    case 'show':
      component = <PostShowContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={modal === 'show' ? closeModal : null}>
      <div className="modal-child" onClick={modal === 'show' ? e => e.stopPropagation() : null}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
