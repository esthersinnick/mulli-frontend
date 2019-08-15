import axios from 'axios';

class ChallengeService {
  constructor(){
    this.challenge = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/challenges'
    });
  }

  getAllChallenges(){
    return this.appStore.get('/')
    .then(response => response) 
  };

  getOneChallenge(id){
    return this.appStore.get(`/${id}`)
    .then(response => response) 
  };

  addOneChallenge(newChallenge){
    return this.appStore.post('/add', newChallenge)
    .then(response => response)

  }
  
  updtateOneChallenge(id, updateChallenge){
    return this.appStore.put(`/${id}/edit`,updateChallenge)
    .then(response => response);
  }

  deleteOneChallenge(id){
    return this.appStore.delete(`/${id}/delete`)
    .then(response => response);
  }
}

const challengeService = new ChallengeService();

export default challengeService;
