import React from 'react';
import PostModalProfile from './post_modal_profile';

export default class PostNew extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      body: '',
      image: null,
      imgUrl: null
    };
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
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
      this.setState({ image: file, imgUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imgUrl: "", image: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = this.state.image;

    const formData = new FormData();
    formData.append("post[body]", this.state.body);
    if (file) { formData.append("post[image]", file); }

    this.props.createPost(formData).then( resp => {
      this.props.closeModal();
    });
  }

  render() {
    let styledErrors = this.props.errors.map( err => {
      return err+'!';
    });
    return (
      <div className="post-new-container">
        <div className="post-new-form">
          <div className="post-new-image">
            <img className="post-new-image-preview" src={this.state.imgUrl} />
          </div>

          <div className="post-new-side">
            <div className="x-button" onClick={this.props.closeModal}><i className="fas fa-times fa-lg"></i></div>
            <PostModalProfile user={this.props.sessionUser} closeModal={this.props.closeModal} />
            <div className="post-show-divide"></div>
            <div className="post-new-submit">
              <div className="post-new-errors">{styledErrors}</div>
              <label htmlFor="file-upload" className="post-file-upload">
                <i className="fas fa-camera-retro"></i> Choose File
              </label>
              <input id="file-upload" type="file" onChange={this.updateFile}/>
              <textarea rows="4" cols="30" maxLength="280" placeholder="Caption..." value={this.state.body} onChange={this.handleChange('body')}>
              </textarea>

              <button onClick={this.handleSubmit}>Share</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
