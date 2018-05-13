import React from 'react';


export default class PostLiteContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.openShowModal(this.props.post.id);
  }

  render() {
    return (
      <li className="post-lite-container" onClick={this.handleClick}>
        <img className="post-lite-container-img"
          src={this.props.post.img_url} />
      </li>
    )
  }
}
