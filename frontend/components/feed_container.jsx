import React from 'react';
import PostIndexContainer from './post_index_container';
import SidebarContainer from './sidebar_container';

export default class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="feedContainer">
        <PostIndexContainer />
        <SidebarContainer />
      </div>
    );
  }


}
