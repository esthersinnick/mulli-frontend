import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class FileUploadComponent extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.getImage(url);
        this.setState({ avatarURL: url })
      });
  };

  render() {
    const { isUploading, progress, avatarURL } = this.state;
    return (
      <div className="upload-container">
        {isUploading && <p>Progress: {progress}</p>}
        {avatarURL && <img src={avatarURL} className="image-preview" alt='name' />}


        <label style={{ backgroundColor: '#9fe5cd', color: '#12586f', padding: 20, borderRadius: 4, textTransform: 'uppercase', fontSize: 24, fontWeight: 100, letterSpacing: 2, pointer: 'cursor' }}>
          Select your art
          <FileUploader
            accept="image/*"
            hidden
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>

        {/* <label>Upload your art:</label>
        {isUploading && <p>Progress: {progress}</p>}
        {avatarURL && <img src={avatarURL} alt='name' />}
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          //multiple
          storageRef={firebase.storage().ref("images")} //pasa por prop la carpeta avatar o art
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        /> */}
      </div>
    );
  }
}

export default FileUploadComponent;

