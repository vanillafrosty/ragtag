import React from 'react';
import ProfileInfoContainer from './profile_info_container';
import PostLitePage from './post_lite_page';

export default class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-container">
        <ProfileInfoContainer />
        <PostLitePage />
      </div>
    );
  }

}
