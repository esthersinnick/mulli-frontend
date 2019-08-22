import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import withAuth from '../components/withAuth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: ''
  };

  handleFormSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const { email, password } = this.state;

    this.props
      .login({ email, password })
      .then(user => {
        console.log(user);
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
    const { email, password, errors } = this.state;
    return (
      <>
        <Navbar />
        <form className="login-form" onSubmit={this.handleFormSubmit}>
          <label htmlFor="email">email:</label>
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
          {errors && (
            <div class="errors">
              <p>{errors}</p>
            </div>
          )}
          <button type="submit" disabled={!email || !password} >Log in</button>
        </form>

        <p>
          You don't have an accout yet?
          <Link to={'/signup'}> Signup</Link>
        </p>

      </>
    );
  }
}

export default withAuth(Login);