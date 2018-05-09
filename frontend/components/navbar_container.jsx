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
              item 1
            </li>
            <li>
              item 2
            </li>
            <li>
              item 3
            </li>
            <li>
              item 4
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}
