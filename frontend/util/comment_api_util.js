export const createComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: `api/posts/${comment.post_id}/comments`,
    data: { comment: comment }
  });
};

export const removeComment = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/comments/${id}`
  });
};

export const fetchComments = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/posts/${id}/comments`
  });
};
