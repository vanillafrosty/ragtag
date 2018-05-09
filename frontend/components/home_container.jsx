import React from 'react';
import PostIndexContainer from './post_index_container';
import NavbarContainer from './navbar_container';
import SidebarContainer from './sidebar_container';

export default class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homeContainer">
        <NavbarContainer />
        <div className="feedContainer">
          <PostIndexContainer />
          <SidebarContainer />
        </div>
      </div>
    );
  }


}
