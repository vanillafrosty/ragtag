export const fetchPosts = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/posts'
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
