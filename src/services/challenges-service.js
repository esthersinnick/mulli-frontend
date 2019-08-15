import axios from 'axios';

class ChallengeService {
  constructor(){
    this.challenge = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN
    });
  }

  getAllChallenges(){
    return this.appStore.get('/challenges/')
    .then(response => response) 
  };

  getOneChallenge(id){
    return this.appStore.get(`/challenges/${id}`)
    .then(response => response) 
  };

  addOneChallenge(newChallenge){
    return this.appStore.post('/challenges/add', newChallenge)
    .then(response => response)

  }
  
  updtateOneChallenge(id, updateChallenge){
    return this.appStore.put(`/challenges/${id}/edit`,updateChallenge)
    .then(response => response);
  }

  deleteOneChallenge(id){
    return this.appStore.delete(`/challenges/${id}/delete`)
    .then(response => response);
  }
}

const challengeService = new ChallengeService();

export default challengeService;
