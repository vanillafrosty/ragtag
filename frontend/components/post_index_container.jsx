import { connect } from 'react-redux';
import PostIndex from './post_index';
import { fetchPosts } from '../actions/post_actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    posts: _.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
