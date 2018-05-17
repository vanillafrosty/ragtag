export const fetchPosts = (params) => {
  return $.ajax({
    method: 'GET',
    url: 'api/posts',
    data: params
  });
};

export const createPost = (post) => {
  return $.ajax({
    method: 'POST',
    url: 'api/posts',
    contentType: false,
    processData: false,
    data: post
  });
};

export const updatePost = (post) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/posts/${post.id}`,
    data: {post: post}
  });
};


export const removePost = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/posts/${id}`
  });
};
