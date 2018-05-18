import React from 'react';
import NavbarContainer from './nav/navbar_container';
import { Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import FeedContainer from './feed/feed_container';
import ProfileContainer from './profile/profile_container';
import Modal from './modal/modal';
import ExploreContainer from './explore/explore_container';

const HomeContainer = (props) => {
  return (
    <div className="home-container">
      <Modal />
      <NavbarContainer />
      <Switch>
        <ProtectedRoute path="/user/:userId" component={ProfileContainer} />
        <ProtectedRoute path="/explore" component={ExploreContainer} />
        <ProtectedRoute path="/" component={FeedContainer} />
      </Switch>
    </div>
  );
};

export default HomeContainer;
