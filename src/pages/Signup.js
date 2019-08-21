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
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            required
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Signup"
            disabled={!password || !name || !username || !email}
          />
        </form>

        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>

        {errors && (
          <div class="errors">
            <p>{errors}</p>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(Signup);