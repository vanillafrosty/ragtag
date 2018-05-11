import React from 'react';
import PostLitePage from './post_lite_page';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';
import { logout } from '../actions/session_actions';
import _ from 'lodash';
import { fetchPosts } from '../actions/post_actions';
import { openModal } from '../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts()),
    openCreateModal: () => dispatch(openModal('create')),
    openShowModal: () => dispatch(openModal('show'))
  };
};

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { user, posts, logout, openCreateModal, openShowModal } = this.props;
    return (
      <div className="profile-container">
        <ProfileInfo user={user} posts={posts} logout={logout} openModal={openCreateModal} />
        <PostLitePage posts={posts} openModal={openShowModal} />
      </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
