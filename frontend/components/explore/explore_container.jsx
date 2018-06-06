import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchExplore, addExplore, clearPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import PostLiteContainer from '../profile/post_lite_container';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  return {
    currentUser: currentUser,
    posts: _.values(state.entities.posts).sort((a,b) => a.order - b.order)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExplore: (page) => dispatch(fetchExplore(page)),
    addPosts: (page) => dispatch(addExplore(page)),
    clearPosts: () => dispatch(clearPosts()),
    openShowModal: (postId) => dispatch(openModal({ status: 'explore', postId: postId }))
  };
};



class ExploreContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 1
    }
    this.onScroll = this.onScroll.bind(this);
    this.timeout = false;
  }

  componentDidMount() {
    this.props.fetchExplore(this.state.page);
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    this.props.clearPosts();
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 60) && !this.timeout) {
      // debugger;
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
    const postLiteArr = this.props.posts.map( post => {
      return <PostLiteContainer key={post.id} openShowModal={this.props.openShowModal} post={post} />
    });
    return (
      <div className="explore-container">
        <div className="explore-text">Explore.</div>
        <ul className="post-lite-list">
          {postLiteArr}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
