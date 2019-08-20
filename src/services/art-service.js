import axios from 'axios';

class ArtService {
  constructor() {
    this.art = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/arts',
      withCredentials: true,
    })
  }

  addOneArt(newArt, challengeId) {
    const data = {
      newArt,
      challengeId
    }
    return this.art.post('/add', data)
      .then(response => response)
  };


  getAllArts() {
    return this.art.get('/')
      .then(response => response)
  };

  getAllMyArts() {
    return this.art.get('/myArts')
      .then(response => response)
  };

  getAllArtsOfUser(userId) {
    return this.art.get(`/${userId}`)
      .then(response => response)
  };

  getAllArtsOfChallenges(challengeId) {
    return this.art.get(`/challenge/${challengeId}`)
      .then(response => response)
  };

  getOneArtOfUserAndChallenge(challengeId) {
    return this.art.get(`/challenge/${challengeId}/user`)
      .then(response => response);
  }

  updateArt(artId, updateArt) {
    return this.art.put(`/${artId}/update`, updateArt)
      .then(response => response);
  };

  voteArt(artId) {
    return this.art.put(`/${artId}/addVote`)
      .then(response => response);
  };

  updateArtOfUserAndChallenge(challengeId, updateArt) {
    return this.art.put(`/${challengeId}/user/update`, updateArt)
      .then(response => response);
  };

  getMyVotedArtsOfChallenge(challengeId) {
    return this.art.get(`/challenge/${challengeId}/artsVoted`)
      .then(response => response);
  };

  deleteArtWhenVoting(challengeId) {
    return this.art.delete(`/${challengeId}/delete`)
      .then(response => response)
  }



}

const artService = new ArtService();

export default artService;