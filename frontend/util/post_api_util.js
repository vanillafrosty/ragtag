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
