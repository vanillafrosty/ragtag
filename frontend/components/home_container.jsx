import React from 'react';
import NavbarContainer from './navbar_container';
import { Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import FeedContainer from './feed_container';
import ProfileContainer from './profile_container';



export default class HomeContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <NavbarContainer />
        <Switch>
          <ProtectedRoute path="/user/:userId" component={ProfileContainer} />
          <ProtectedRoute path="/" component={FeedContainer} />
        </Switch>
      </div>
    )
  }

}
