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
  }

  render() {
    return (
      <div className="searchbar-container">
        <input className="searchbar" type="text" maxLength="60" placeholder="Search" />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarContainer);
