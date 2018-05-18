import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndexItemContainer from './post_index_item_container';
import { fetchIndex, clearPosts } from '../../actions/post_actions';
import { selectFollowed } from '../../reducers/selectors';
import _ from 'lodash';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  let followedUsers = selectFollowed(state.entities.users, currentUser);
  return {
    currentUser: currentUser,
    posts: _.values(state.entities.posts),
    followedUsers: followedUsers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndex: () => dispatch(fetchIndex()),
    clearPosts: () => dispatch(clearPosts())
  };
};

class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchIndex();
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    const post_containers = this.props.posts.map( post => {
      return <PostIndexItemContainer key={post.id} post={post}
        currentUser={this.props.currentUser} />
    });
    return (
      <div className="feedContainer">
        <div className="post-index-container">
          {post_containers}
        </div>
        <Sidebar user={this.props.currentUser} followedUsers={this.props.followedUsers} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
