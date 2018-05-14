import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndex from './post_index';
import { fetchPosts } from '../../actions/post_actions';
import { createLike } from '../../actions/like_actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    createLike: (id) => dispatch(createLike(id))
  };
};

class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="feedContainer">
        <PostIndex posts={this.props.posts} fetchPosts={this.props.fetchPosts}
          createLike={this.props.createLike} />
        <Sidebar user={this.props.user} posts={this.props.posts} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
