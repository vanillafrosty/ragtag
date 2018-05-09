import React from 'react';

export default class NavbarContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
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
        <svg id="ragtagSVG"><use href="#ragtag"></use></svg>
      </header>
    )
  }

}
