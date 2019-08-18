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

    artService.getOneArtOfUserAndChallenge(challengeId)
      .then(response => {
        const art = (response.data.listOfArts[0]);
        const artId = art._id
        const updateArt = {
          images: this.state.images
        }
        artService.updateArt(artId, updateArt)
          .then(response => {
            console.log(response, updateArt)
          }).catch(error => console.log(error))


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
      <form onSubmit={this.submitForm}>
        <FileComponent getImage={this.getImage} />
        <button type="submit">Upload Art</button>
      </form>
    );
  }
};

export default withAuth(UploadArtForm);
