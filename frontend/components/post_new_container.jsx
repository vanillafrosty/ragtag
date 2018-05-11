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
        <form>
          <div className="post-new-image">
          </div>

          <div className="post-new-side">
            <div className="x-button" onClick={this.props.closeModal}><i class="fas fa-times fa-lg"></i></div>
            <div className="post-new-submit">
              <textarea rows="4" cols="30" maxlength="280" placeholder="Caption" value={this.state.body} onChange={this.handleChange('body')}>
              </textarea>

              <button type="button">Share</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}
