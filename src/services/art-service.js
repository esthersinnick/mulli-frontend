import axios from 'axios';

class ArtService {
  constructor() {
    this.art = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN +'/arts',
      withCredentials: true,
    })
  }


// get all arts
  getAllArts(){
    return this.art.get('/')
    .then(response => response)
  };

// get all arts of a user

getAllArts(userId){
  return this.art.get(`/${userId}`)
  .then(response => response)
};

// get all arts of a challenge

getAllArts(challengeId){
  return this.art.get(`/${challengeId}`)
  .then(response => response)
};

// add a new art

  addOneArt(newArt){
    return this.appStore.post('/add', newArt)
    .then(response => response)
  };


// edit an art

  updateArt(artId, updateArt){
    return this.appStore.put(`/${artId}/update`,updateArt)
    .then(response => response);
  }


//   getOneArt(){

//   };

//   

//   updateArt(id, updateArt){
//     return this.appStore.put(`/apps/${id}/update`,updateArt)
//     .then(response => response);
//   }

//   deleteOneArt(id){
//     return this.appStore.delete(`/apps/${id}/delete`)
//     .then(response => response);
//   }
// }

// const artService = new ArtService();

// export default artService;
