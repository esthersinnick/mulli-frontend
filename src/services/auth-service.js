import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/auth',
      withCredentials: true,
    })
  }

  signup(user) {
    const { email, password } = user;
    return this.auth.post('/signup', {email, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/login', {email, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/me')
    .then(response => response.data)
  }
}

const auth = new AuthService();

export default auth