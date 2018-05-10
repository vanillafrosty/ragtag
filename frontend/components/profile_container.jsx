import React from 'react';
import NavbarContainer from './navbar_container';

export default class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <h1>THIS IS A PROFILE PAGE</h1>
        <h1>CURRENT user is...{this.props.userId}</h1>
      </div>
    );
  }

}
