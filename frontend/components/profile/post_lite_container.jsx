import React from 'react';


export default class PostLiteContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="post-lite-container">
        THIS is a POST
        {this.props.post.id}
      </li>
    )
  }
}
