import React from 'react';
import ProfileInfoContainer from './profile_info_container';


export default class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>THIS IS A PROFILE PAGE</h1>
        <h1>CURRENT user is...{this.props.userId}</h1>
        <ProfileInfoContainer />
      </div>
    );
  }

}
