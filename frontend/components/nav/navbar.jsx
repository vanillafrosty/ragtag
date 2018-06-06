import React from 'react';
import SearchbarContainer from './searchbar_container';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header className="navbarHeader">
        <nav className="navbarContainer">
          <Link to="/">
            <div className="navbar-logo-title">
              <svg id="ragtagSVG"><use href="#ragtag"></use></svg>
              <h1>Ragtag</h1>
            </div>
          </Link>
          <SearchbarContainer />
          <ul className="navbar-buttons">
            <li>
              <Link to="/explore"><i className="far fa-compass fa-lg"></i></Link>
            </li>
            <li>
              <Link to={`/user/${this.props.userId}`}><i className="far fa-user fa-lg"></i></Link>
            </li>
            <li>
              <a href="https://github.com/vanillafrosty/ragtag"><i className="fab fa-github fa-lg"></i></a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}
