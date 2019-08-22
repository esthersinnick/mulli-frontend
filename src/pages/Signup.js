import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import withAuth from '../components/withAuth';

class Signup extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    errors: ''
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const username = this.state.username;

    this.props
      .signup({ email, password, name, username })
      .then(user => {
        console.log(user);
        this.setState({
          name: '',
          username: '',
          email: '',
          password: '',
          errors: ''
        });
      })
      .catch(({ response }) => {
        this.setState({ errors: response.data.message });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, name, username, errors } = this.state;
    return (
      <>

        <Navbar />
        <div className="auth-page">
          <form onSubmit={this.handleFormSubmit}>
            <input id="name" type="text" name="name" value={name} placeholder="Name" required onChange={this.handleChange} />
            <input id="username" type="text" name="username" value={username} placeholder="Usernasme" required onChange={this.handleChange} />
            <input id="email" type="email" name="email" value={email} placeholder="Email" required onChange={this.handleChange} />
            <input id="password" type="password" name="password" value={password} placeholder="Password" required onChange={this.handleChange} />
            {errors && (
              <div class="errors">
                <p>{errors}</p>
              </div>
            )}
            <button type="submit" disabled={!password || !name || !username || !email}>Sign up</button>
            <p>
              Already have account?
            <Link to={'/login'}> Login</Link>
            </p>

          </form>

        </div>
      </>
    );
  }
}

export default withAuth(Signup);