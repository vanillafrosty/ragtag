import React from 'react';
import PostIndexItem from './post_index_item';

export default class PostIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    let posts = this.props.posts.map( post => {
      return <PostIndexItem key={post.id} post={post} />
    });
    return (
      <div>
        <h1>WELCOME, {this.props.user.username}</h1>
        <button type="button" onClick={this.props.logout}>Logout</button>
        <h1>HERE is your user feed</h1>
        <ul>
          {posts}
        </ul>
      </div>
    );
  }
}
