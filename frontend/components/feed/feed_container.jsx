import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndex from './post_index';
import { fetchPostsAndUsers } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsAndUsers: (params) => dispatch(fetchPostsAndUsers(params)),
    createLike: (id) => dispatch(createLike(id))
  };
};

class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPostsAndUsers({ type: 'index' });
  }

  render() {
    return (
      <div className="feedContainer">
        <PostIndex posts={this.props.posts} createLike={this.props.createLike}
          currentUser={this.props.currentUser} />
        <Sidebar user={this.props.currentUser} posts={this.props.posts} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
