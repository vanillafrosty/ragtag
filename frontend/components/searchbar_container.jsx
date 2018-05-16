import React from 'react';


export default class SearchbarContainer extends React.Component {

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
