import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments: comments
  };
};

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment: comment
  };
};

export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment: comment
  };
};

export const fetchComments = (postId) => {
  return (dispatch) => {
    return APIUtil.fetchComments(postId).then( comments => {
      return dispatch(receiveComments(comments));
    });
  };
};

export const createComment = (postId) => {
  return (dispatch) => {
    return APIUtil.createComment(postId).then( comment => {
      return dispatch(receiveComment(comment));
    });
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return APIUtil.removeComment(id).then( comment => {
      return dispatch(removeComment(comment));
    });
  };
};
