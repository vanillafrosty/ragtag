import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';


export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
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


export const createComment = (comment) => {
  return (dispatch) => {
    return APIUtil.createComment(comment).then( comment => {
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
