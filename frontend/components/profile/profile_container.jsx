import React from 'react';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';
import { logout } from '../../actions/session_actions';
import _ from 'lodash';
import { fetchUserShow, clearPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import PostLiteContainer from './post_lite_container';
import { fetchUser, updateUser, updateUserPic } from '../../actions/user_actions';
import { createFollow } from '../../actions/follow_actions';

const mapStateToProps = (state, ownProps) => {
  let user;
  let fetched = state.entities.users[ownProps.match.params.userId];
  if (fetched === undefined || fetched.follows === undefined) {
    user = {follows: []};
  } else {
    user = fetched;
  }
  let followed = user.follows.includes(state.session.id);
  return {
    user: user,
    currentUser: state.session.id,
    posts: _.values(state.entities.posts),
    followed: followed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createFollow: () => dispatch(createFollow(ownProps.match.params.userId)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUser: (user) => dispatch(updateUser(user)),
    updateUserPic: (user) => dispatch(updateUserPic(user)),
    logout: () => dispatch(logout()),
    fetchUserShow: (params) => dispatch(fetchUserShow(params)),
    openCreateModal: () => dispatch(openModal({ status: 'create', postId: null })),
    openShowModal: (postId) => dispatch(openModal({ status: 'show', postId: postId })),
    clearPosts: () => dispatch(clearPosts())
  };
};

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let id = this.props.match.params.userId;
    this.props.fetchUserShow({ type: "user", id: id });
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.userId;
    if (this.props.match.params.userId !== id) {
      this.props.fetchUserShow({ type: "user", id: id });
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    const { user, posts, logout, openCreateModal, openShowModal, currentUser, createFollow, followed, updateUser, updateUserPic } = this.props;
    let postLiteArr = posts.map( post => {
      return <PostLiteContainer key={post.id} openShowModal={openShowModal} post={post} />
    });
    return (
      <div className="profile-container">
        <ProfileInfo user={user} currentUser={currentUser} updateUser={updateUser} updateUserPic={updateUserPic} followed={followed}
          createFollow={createFollow} posts={posts} logout={logout} openCreateModal={openCreateModal} />
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
