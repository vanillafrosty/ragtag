import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostNewContainer from './post_new_container';
import PostShowContainer from './post_show_container';
import { createPost, clearErrors } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import { fetchCommentsAndUsers, clearComments, createComment } from '../../actions/comment_actions';
import _ from 'lodash';

const Modal = ({users, errors, clearErrors, modal, closeModal, createPost, post, createLike, liked, fetchCommentsAndUsers, comments, clearComments, currentUser, createComment}) => {
  if (!modal.status) {
    return null;
  }
  let component;
  switch (modal.status) {
    case 'create':
      component = <PostNewContainer currentUser={currentUser} closeModal={closeModal} createPost={createPost}
        errors={errors} clearErrors={clearErrors} />;
      break;
    case 'show':
      component = <PostShowContainer currentUser={currentUser} users={users} post={post} createLike={createLike} liked={liked}
        fetchCommentsAndUsers={fetchCommentsAndUsers} clearComments={clearComments} comments={comments} createComment={createComment} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={modal.status === 'show' ? closeModal : null}>
      <div className="modal-child" onClick={modal.status === 'show' ? e => e.stopPropagation() : null}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  let modal, post, users, liked, currentUser;
  modal = state.ui.modal;
  currentUser = state.entities.users[state.session.id];
  if (modal.status === 'show') {
    post = state.entities.posts[modal.postId];
    users = state.entities.users;
    liked = post.likes.includes(currentUser.id);
  }
  return {
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
    clearErrors: () => dispatch(clearErrors()),
    createLike: (id) => dispatch(createLike(id)),
    fetchCommentsAndUsers: (id) => dispatch(fetchCommentsAndUsers(id)),
    clearComments: () => dispatch(clearComments()),
    createComment: (comment) => dispatch(createComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
