import React from 'react';

export default class PostShowContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="post-show-container">
        <h1>SHOWING A POST!!!</h1>
        post id is {this.props.postId}
      </div>
    );
  }

}
