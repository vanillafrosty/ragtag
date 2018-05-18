export const searchUsers = (searchStr) => {
  return $.ajax({
    method: 'GET',
    url: `api/search`,
    data: {searchStr : searchStr}
  });
};
