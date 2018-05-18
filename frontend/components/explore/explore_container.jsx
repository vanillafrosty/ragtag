import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchExplore, clearPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import PostLiteContainer from '../profile/post_lite_container';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  return {
    currentUser: currentUser,
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExplore: () => dispatch(fetchExplore()),
    clearPosts: () => dispatch(clearPosts()),
    openShowModal: (postId) => dispatch(openModal({ status: 'show', postId: postId }))
  };
};



class ExploreContainer extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchExplore();
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    const postLiteArr = this.props.posts.map( post => {
      return <PostLiteContainer key={post.id} openShowModal={this.props.openShowModal} post={post} />
    });
    return (
      <div className="explore-container">
        <ul className="post-lite-list">
          {postLiteArr}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
