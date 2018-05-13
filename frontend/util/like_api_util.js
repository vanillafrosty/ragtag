export const createLike = (id) => {
  return $.ajax({
    method: 'POST',
    url: `api/posts/${id}/likes`
  });
};


export const removeLike = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/posts/${id}/likes`
  });
};
