import React from 'react';
import { Link } from 'react-router-dom';


export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentWillReceiveProps(nextProps) {
    let newQuery = nextProps.query;
    if (newQuery.length > 0 && this.props.query !== newQuery) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.props.fetchSearchUsers(newQuery);
      }, 350);
    };
    if (newQuery.length === 0 && this.props.query !== newQuery) {
      this.props.clearSearchUsers();
    }
  }

  render() {
    let searchedArr;
    if (this.props.query.length === 0){
      searchedArr = [];
    } else {
      if (typeof this.props.searchedUsers[0] === 'string') {
        searchedArr = (
          <li className="search-results-li">
            <div className="search-results-none">No results</div>
          </li>);
      } else {
        searchedArr = this.props.searchedUsers.map( user => {
          return (
            <li key={user.id} className="search-results-li">
              <Link to={`/user/${user.id}`} onClick={this.props.clearSearch}><div className="search-results-img"><img src={user.avatar_url} /></div></Link>
              <Link to={`/user/${user.id}`} onClick={this.props.clearSearch}><div className="search-results-text">{user.username}</div></Link>
            </li>
          )
        });
      }
    }

    return (
      <ul className="search-results">
        {searchedArr}
      </ul>
    );
  }
}
