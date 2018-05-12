import React from 'react';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';
import { logout } from '../../actions/session_actions';
import _ from 'lodash';
import { fetchPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import PostLiteContainer from './post_lite_container';

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
    let postLiteArr = posts.map( post => {
      return <PostLiteContainer key={post.id} openModal={openShowModal} post={post} />
    });
    return (
      <div className="profile-container">
        <ProfileInfo user={user} posts={posts} logout={logout} openModal={openCreateModal} />
        <div className="profile-divide"></div>
        <div>
          <ul className="post-lite-list">
            {postLiteArr}
          </ul>
        </div>
      </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
