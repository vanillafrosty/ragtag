import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndex from './post_index';
import { fetchIndex, clearPosts } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    posts: _.values(state.entities.posts),
    comments: state.entities.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndex: (params) => dispatch(fetchIndex(params)),
    createLike: (id) => dispatch(createLike(id)),
    clearPosts: () => dispatch(clearPosts())
  };
};

class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchIndex({ type: 'index' });
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    return (
      <div className="feedContainer">
        <PostIndex posts={this.props.posts} users={this.props.users}
          createLike={this.props.createLike} currentUser={this.props.currentUser}
          comments={this.props.comments} />
        <Sidebar user={this.props.currentUser} posts={this.props.posts} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
