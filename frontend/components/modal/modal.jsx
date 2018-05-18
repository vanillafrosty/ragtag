import React from 'react';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostNewContainer from './post_new_container';
import PostShowContainer from './post_show_container';
import PostExploreContainer from './post_explore_container';
import { createPost, clearErrors, updatePost, deletePost } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import { fetchCommentsAndUsers, clearComments, createComment } from '../../actions/comment_actions';
import _ from 'lodash';

const Modal = ({users, errors, clearErrors, modal, closeModal, createPost, post, updatePost, deletePost, createLike, liked, fetchCommentsAndUsers, comments, clearComments, sessionUser, currentUser, createComment}) => {

  if (!modal.status) {
    return null;

  }
  let component;
  switch (modal.status) {
    case 'create':
      component = <PostNewContainer sessionUser={sessionUser} closeModal={closeModal} createPost={createPost}
        errors={errors} clearErrors={clearErrors} />;
      break;
    case 'show':
      component = <PostShowContainer sessionUser={sessionUser} currentUser={currentUser} users={users} post={post} createLike={createLike} liked={liked}
        fetchCommentsAndUsers={fetchCommentsAndUsers} clearComments={clearComments} comments={comments} createComment={createComment} updatePost={updatePost} deletePost={deletePost} closeModal={closeModal} />;
      break;
    case 'explore':
      component = <PostExploreContainer sessionUser={sessionUser} users={users} post={post} createLike={createLike} liked={liked}
        comments={comments} createComment={createComment} closeModal={closeModal} />;
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
  let modal, post, users, liked, sessionUser, currentUser;
  modal = state.ui.modal;
  sessionUser = state.entities.users[state.session.id];
  let matched = ownProps.location.pathname.match(/\d+/);
  if (matched) {
    currentUser = state.entities.users[matched[0]];
  }
  //set dummy currentUser before postShowContainer calls fetchCommentsAndUsers (remember fetchCommentsAndUsers
  //will force include session user and the post's user)
  if (currentUser === undefined) {
    currentUser = {};
  }
  if (modal.status === 'show') {
    post = state.entities.posts[modal.postId];
    //when we remove a post, the modal will try to re-render before it fails the modal.status check.
    //since the post will be removed from the redux state, we fail unless we put a dummy post here.
    if (typeof post === 'undefined') {
      return { likes: [] };
    }
    users = state.entities.users;
    liked = post.likes.includes(sessionUser.id);
  }
  if (modal.status === 'explore') {
    post = state.entities.posts[modal.postId];
    users = state.entities.users;
    liked = post.likes.includes(sessionUser.id);
  }
  return {
    sessionUser: sessionUser,
    currentUser: currentUser,
    modal: modal,
    post: post,
    errors: state.errors.post,
    users: users,
    liked: liked,
    comments: state.entities.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
    deletePost: (id) => { return dispatch(deletePost(id)) },
    clearErrors: () => dispatch(clearErrors()),
    createLike: (id) => dispatch(createLike(id)),
    fetchCommentsAndUsers: (id) => dispatch(fetchCommentsAndUsers(id)),
    clearComments: () => dispatch(clearComments()),
    createComment: (comment) => dispatch(createComment(comment))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
