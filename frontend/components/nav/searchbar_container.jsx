import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSearchUsers } from '../../actions/search_actions';


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
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    });
  }

  render() {
    const searchedArr = this.props.searchedUsers.map( user => {
      return (
        <li key={user.id}>
          <div>user.username</div>
          <div>user.id</div>
        </li>
      )
    });
    return (
      <div className="searchbar-container">
        <input className="searchbar" type="text" maxLength="60" value={this.state.body} onChange={this.handleChange} placeholder="Search" />
        <ul>
          {searchedArr}
        </ul>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarContainer);
