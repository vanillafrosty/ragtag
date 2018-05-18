import React from 'react';
import { Link } from 'react-router-dom';


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
            <Link to={`/user/${user.id}`} onClick={this.props.clearSearch}><div className="search-results-img"><img src={user.avatar_url} /></div></Link>
            <Link to={`/user/${user.id}`} onClick={this.props.clearSearch}><div className="search-results-text">{user.username}</div></Link>
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
