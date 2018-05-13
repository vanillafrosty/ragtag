import React from 'react';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';
import { logout } from '../../actions/session_actions';
import _ from 'lodash';
import { fetchPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import PostLiteContainer from './post_lite_container';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  let fetched = state.entities.users[ownProps.match.params.userId];
  let user = fetched === undefined ? {follows: []} : fetched;
  return {
    user: user,
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts()),
    openCreateModal: () => dispatch(openModal({ status: 'create', postId: null })),
    openShowModal: (postId) => dispatch(openModal({ status: 'show', postId: postId }))
  };
};

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }

  render() {
    const { user, posts, logout, openCreateModal, openShowModal } = this.props;
    let postLiteArr = posts.map( post => {
      return <PostLiteContainer key={post.id} openShowModal={openShowModal} post={post} />
    });
    return (
      <div className="profile-container">
        <ProfileInfo user={user} posts={posts} logout={logout} openCreateModal={openCreateModal} />
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
