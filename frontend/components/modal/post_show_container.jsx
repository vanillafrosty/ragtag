import React from 'react';
import PostShow from './post_show';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { updatePost, deletePost } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import { createComment } from '../../actions/comment_actions';
import { selectPostComments } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  let modal, post, users, liked, sessionUser, currentUser;
  modal = state.ui.modal;
  sessionUser = state.entities.users[state.session.id];
  let matched = ownProps.location.pathname.match(/\d+/);
  if (matched) {
    currentUser = state.entities.users[matched[0]];
  }
  post = state.entities.posts[modal.postId];
  //when we remove a post from the state, the modal will try to re-render before we actually close it.
  //since the post will be removed from the redux state, we fail unless we put a dummy post here.
  if (typeof post === 'undefined') {
    post = { likes: [], comments: [] };
  }
  users = state.entities.users;
  liked = post.likes.includes(sessionUser.id);
  let comments = state.entities.comments;
  let postComments = selectPostComments(post, comments, users);
  return {
    sessionUser: sessionUser,
    currentUser: currentUser,
    post: post,
    users: users,
    liked: liked,
    comments: comments,
    postComments: postComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    updatePost: (post) => dispatch(updatePost(post)),
    deletePost: (id) => { return dispatch(deletePost(id)) },
    createLike: (id) => dispatch(createLike(id)),
    createComment: (comment) => dispatch(createComment(comment))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostShow));
