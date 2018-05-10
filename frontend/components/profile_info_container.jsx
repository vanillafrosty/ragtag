import React from 'react';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';
import { logout } from '../actions/session_actions';
import _ from 'lodash';
import { fetchPosts, createPost } from '../actions/post_actions';
import { toggleModal } from '../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts()),
    createPost: (post) => dispatch(createPost(post)),
    toggleModal: () => dispatch(toggleModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
