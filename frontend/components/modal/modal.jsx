import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostNewContainer from './post_new_container';
import PostShowContainer from './post_show_container';
import PostExploreContainer from './post_explore_container';

const Modal = ({modal, closeModal}) => {

  if (!modal.status) {
    return null;

  }
  let component;
  switch (modal.status) {
    case 'create':
      component = <PostNewContainer />;
      break;
    case 'show':
      component = <PostShowContainer />;
      break;
    case 'explore':
      component = <PostExploreContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={modal.status !== 'create' ? closeModal : null}>
      <div className="modal-child" onClick={modal.status !== 'create' ? e => e.stopPropagation() : null}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
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
