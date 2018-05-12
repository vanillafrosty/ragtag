import React from 'react';
import PostIndexContainer from './post_index_container';
import SidebarContainer from './sidebar_container';


const FeedContainer = (props) => {
  return (
    <div className="feedContainer">
      <PostIndexContainer />
      <SidebarContainer />
    </div>
  );
};

export default FeedContainer;
