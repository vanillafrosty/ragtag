import React from 'react';


export default class PostLiteContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="post-lite-container">
        <img className="post-lite-container-img"
          src={this.props.post.img_url} />
      </li>
    )
  }
}
