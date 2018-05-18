import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSearchUsers } from '../../actions/search_actions';
import SearchResults from './search_results';

const mapStateToProps = (state) => {
  let searchedUsers = state.entities.search.users;
  return {
    searchedUsers: _.values(searchedUsers)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchUsers: (str) => dispatch(fetchSearchUsers(str))
  };
};


class SearchbarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    });
  }

  clearSearch() {
    this.setState({
      body: ''
    });
  }

  render() {
    return (
      <div className="searchbar-container">
        <input className="searchbar" type="text" maxLength="60" value={this.state.body} onChange={this.handleChange} placeholder="Search" />
        <SearchResults fetchSearchUsers={this.props.fetchSearchUsers} clearSearch={this.clearSearch} query={this.state.body} searchedUsers={this.props.searchedUsers} />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarContainer);
