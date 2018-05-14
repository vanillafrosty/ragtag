import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PostNewContainer from './post_new_container';
import PostShowContainer from './post_show_container';
import { createPost, clearErrors } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';


const Modal = ({user, errors, clearErrors, modal, closeModal, createPost, post, createLike, liked}) => {
  if (!modal.status) {
    return null;
  }
  let component;
  switch (modal.status) {
    case 'create':
      component = <PostNewContainer closeModal={closeModal} createPost={createPost}
        errors={errors} clearErrors={clearErrors} />;
      break;
    case 'show':
      component = <PostShowContainer user={user} post={post} createLike={createLike} liked={liked} />;
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
  let modal, post, user, liked;
  modal = state.ui.modal;
  if (modal.status === 'show') {
    post = state.entities.posts[modal.postId];
    user = state.entities.users[post.user_id];
    liked = post.likes.includes(user.id);
  }
  return {
    modal: modal,
    post: post,
    errors: state.errors.post,
    user: user,
    liked: liked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPost: (post) => dispatch(createPost(post)),
    clearErrors: () => dispatch(clearErrors()),
    createLike: (id) => dispatch(createLike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
