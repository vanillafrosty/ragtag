import React from 'react';



export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.searchedUsers
    };
  }

  componentWillReceiveProps(nextProps) {
    let newQuery = nextProps.query;
    if (newQuery.length > 0 && this.props.query !== newQuery) {
      this.props.fetchSearchUsers(newQuery);
    }
  }

  render() {
    let searchedArr;
    if (this.props.query.length === 0){
      searchedArr = [];
    } else {
      searchedArr = this.props.searchedUsers.map( user => {
        return (
          <li key={user.id} className="search-results-li">
            <div>{user.username}</div>
            <div>{user.id}</div>
          </li>
        )
      });
    }
    return (
      <ul className="search-results">
        {searchedArr}
      </ul>
    );
  }
}
