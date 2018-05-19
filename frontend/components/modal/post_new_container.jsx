import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostNew from './post_new';
import { createPost, clearErrors } from '../../actions/post_actions';

const mapStateToProps = (state, ownProps) => {
  let sessionUser = state.entities.users[state.session.id];
  return {
    sessionUser: sessionUser,
    errors: state.errors.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPost: (post) => dispatch(createPost(post)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNew);
