import axios from 'axios';

class ArtService {
  constructor() {
    this.art = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/arts',
      withCredentials: true,
    })
  }

  addOneArt(newArt){
    return this.art.post('/add', newArt)
    .then(response => response)
  };

  getAllArts(){
    return this.art.get('/')
    .then(response => response)
  };

  getAllArtsOfUser(userId){
    return this.art.get(`/${userId}`)
    .then(response => response)
  };

  getAllArtsOfChallenges(challengeId){
    return this.art.get(`/${challengeId}`)
    .then(response => response)
  };

  updateArt(artId, updateArt){
    return this.art.put(`/${artId}/update`,updateArt)
    .then(response => response);
  };
}

const artService = new ArtService();

export default artService;