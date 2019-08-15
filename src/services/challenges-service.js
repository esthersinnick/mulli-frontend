import axios from "axios";

class ChallengeService {
  constructor() {
    this.challenge = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + "/challenges",
      withCredentials: true
    });
  }

  getAllChallenges() {
    return this.challenge.get("/").then(response => response);
  }

  getOneChallenge(id) {
    return this.challenge.get(`/${id}`).then(response => response);
  }

  addOneChallenge(newChallenge) {
    return this.challenge.post("/add", newChallenge).then(response => response);
  }

  updtateOneChallenge(id, updateChallenge) {
    return this.challenge
      .put(`/${id}/edit`, updateChallenge)
      .then(response => response);
  }

  deleteOneChallenge(id) {
    return this.challenge.delete(`/${id}/delete`).then(response => response);
  }
}

const challengeService = new ChallengeService();

export default challengeService;
