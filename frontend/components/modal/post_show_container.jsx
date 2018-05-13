import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="post-show-container">
        <div className="post-show-image">
          <img className="post-show-image-preview" src={this.props.post.img_url} />
        </div>
        <div className="post-show-side">
          <h3>{this.props.post.body}</h3>
          <h3>number of likes: {this.props.post.likes}</h3>
        </div>
      </div>
    );
  }

}
