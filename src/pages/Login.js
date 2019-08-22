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
        <div className="auth-page">

          <form className="login-form" onSubmit={this.handleFormSubmit}>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              required
              onChange={this.handleChange}
            />
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              required
              onChange={this.handleChange}
            />
            {errors && (
              <div class="errors">
                <p>{errors}</p>
              </div>
            )}
            <button type="submit" disabled={!email || !password} >Log in</button>
            <p>
              You don't have an accout yet?
              <Link to={'/signup'}> Signup</Link>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default withAuth(Login);