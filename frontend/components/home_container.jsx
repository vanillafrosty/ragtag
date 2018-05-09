import React from 'react';
import PostIndexContainer from './post_index_container';
import NavbarContainer from './navbar_container';

export default class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homeContainer">
        <NavbarContainer />
        <PostIndexContainer />
      </div>
    );
  }


}
