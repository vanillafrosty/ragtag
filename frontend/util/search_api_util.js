export const searchUsers = (searchStr) => {
  debugger;
  return $.ajax({
    method: 'GET',
    url: `api/search`,
    data: {searchStr : searchStr}
  });
};
