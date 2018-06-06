import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostExplore from './post_explore';
import { createLike, deleteLike } from '../../actions/like_actions';
import { createComment } from '../../actions/comment_actions';
import { selectPostComments } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  let modal, post, users, liked, sessionUser;
  modal = state.ui.modal;
  sessionUser = state.entities.users[state.session.id];
  post = state.entities.posts[modal.postId];
  users = state.entities.users;
  liked = post.likes.includes(sessionUser.id);
  let comments = state.entities.comments;
  let postComments = selectPostComments(post, comments, users);
  return {
    sessionUser: sessionUser,
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
    createLike: (id) => dispatch(createLike(id)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    createComment: (comment) => dispatch(createComment(comment))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostExplore);
