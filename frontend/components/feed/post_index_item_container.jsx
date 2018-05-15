import React from 'react';
import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { createLike } from '../../actions/like_actions';
import { createComment } from '../../actions/comment_actions';
import { selectPostComments } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  let users = state.entities.users;
  let comments = state.entities.comments;
  let liked = ownProps.post.likes.includes(ownProps.currentUser.id);
  return {
    liked: liked,
    user: users[ownProps.post.user_id],
    postComments: selectPostComments(ownProps.post, comments, users)
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    createLike: (id) => dispatch(createLike(id)),
    createComment: (comment) => {dispatch(createComment(comment))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);



// postComments={post_comments}
// key={post.id} post={post}
// createLike={props.createLike}
// createComment={props.createComment}
// liked={post.likes.includes(props.currentUser.id)}
// user={props.users[post.user_id]}