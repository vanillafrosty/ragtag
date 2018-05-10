import React from 'react';

export default class PostNewContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      body: ''
    };
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState( {
        [field]: e.target.value
      });
    };
  }

  render() {
    return (
      <div className="post-new-container">
        <div className="x-button">&times;</div>
        <form>
          <label>Caption
            <input type="text" value={this.state.body} onChange={this.handleChange('body')} />
          </label>

          <button type="button">Share</button>

        </form>
      </div>
    );
  }

}
