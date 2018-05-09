import React from 'react';
import SearchbarContainer from './searchbar_container';

export default class NavbarContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header className="navbarHeader">
        <nav className="navbarContainer">
          <div className="navbar-logo-title">
            <svg id="ragtagSVG"><use href="#ragtag"></use></svg>
            <h1>Ragtag</h1>
          </div>
          <SearchbarContainer />
          <ul className="navbar-buttons">
            <li>
              <i className="far fa-compass fa-lg"></i>
            </li>
            <li>
              <i className="far fa-heart fa-lg"></i>
            </li>
            <li>
              <i className="far fa-user fa-lg"></i>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}
