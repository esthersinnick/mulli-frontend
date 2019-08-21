import React, { Component } from 'react';
import FileComponent from './FileComponent';
import withAuth from '../components/withAuth';
import artService from '../services/art-service';

class UploadArtForm extends Component {
  state = {
    images: [],
  }

  submitForm = e => {
    e.preventDefault()
    const { challengeId } = this.props;

    const updateArt = {
      images: this.state.images
    }

    artService.updateArtOfUserAndChallenge(challengeId, updateArt)
      .then(response => {
        const { setImage } = this.props

        setImage(response.data.images[0])
      })

    this.props.getIsArt();
  };


  getImage = (url) => {
    const { images } = this.state;
    images.push(url)
    this.setState({
      images,
    })
  }
  render() {
    return (
      <form className="upload-form" onSubmit={this.submitForm}>
        <FileComponent getImage={this.getImage} />
        {
          this.state.images.length > 0 && <button type="submit" className="big-button">Upload Art</button>
        }
      </form>
    );
  }
};

export default withAuth(UploadArtForm);
