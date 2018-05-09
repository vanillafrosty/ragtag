import React from 'react';
import Icons from './icons';

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
        <Icons/>
        <svg id="ragtagSVG"><use href="#ragtag"></use></svg>
      </header>
    )
  }

}
