import React from 'react';

export default class PostNewContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      body: '',
      imgFile: null,
      imgUrl: null
    };
    this.updateFile = this.updateFile.bind(this);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState( {
        [field]: e.target.value
      });
    };
  }

  updateFile(e) {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imgFile: file, imgUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imgUrl: "", imgFile: null });
    }
  }

  render() {
    return (
      <div className="post-new-container">
        <form>
          <div className="post-new-image">
            <img className="post-new-image-preview" src={this.state.imgUrl} />
          </div>

          <div className="post-new-side">
            <div className="x-button" onClick={this.props.closeModal}><i className="fas fa-times fa-lg"></i></div>
            <div className="post-new-submit">
              <input type="file" onChange={this.updateFile} />
              <textarea rows="4" cols="30" maxLength="280" placeholder="Caption" value={this.state.body} onChange={this.handleChange('body')}>
              </textarea>

              <button type="button">Share</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}
