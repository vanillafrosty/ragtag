import React from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import PostIndexItemContainer from './post_index_item_container';
import { fetchIndex, addIndex, clearPosts } from '../../actions/post_actions';
import { selectFollowed } from '../../reducers/selectors';
import _ from 'lodash';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  let followedUsers = selectFollowed(state.entities.users, currentUser);
  return {
    currentUser: currentUser,
    posts: _.values(state.entities.posts).sort((a,b) => a.order - b.order),
    followedUsers: followedUsers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndex: (page) => dispatch(fetchIndex(page)),
    clearPosts: () => dispatch(clearPosts()),
    addPosts: (page) => dispatch(addIndex(page))
  };
};

class FeedContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.onScroll = this.onScroll.bind(this);
    this.timeout = false;
  }

  componentDidMount() {
    this.props.fetchIndex(this.state.page);
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    this.props.clearPosts();
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 60) && !this.timeout) {
      this.timeout = true;
      this.props.addPosts(this.state.page+1).then( resp => {
        this.setState({
          page: this.state.page+1
        });
      });
      setTimeout(() => {this.timeout = false}, 500);
    }
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
