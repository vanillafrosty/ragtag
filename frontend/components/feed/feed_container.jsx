import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndexItemContainer from './post_index_item_container';
import { fetchIndex, clearPosts } from '../../actions/post_actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndex: (params) => dispatch(fetchIndex(params)),
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
    const post_containers = this.props.posts.map( post => {
      return <PostIndexItemContainer key={post.id} post={post}
        currentUser={this.props.currentUser} />
    });
    return (
      <div className="feedContainer">
        <div className="post-index-container">
          {post_containers}
        </div>
        <Sidebar user={this.props.currentUser} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
