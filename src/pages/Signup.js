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
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const username = this.state.username;

    this.props.signup({ email, password, name, username })
      .then((user) => {
        console.log(user)
        this.setState({
          name: '',
          username: '',
          email: '',
          password: '',
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, name, username } = this.state;
    return (
      <>
        <Navbar />
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='name' name='name' value={name} onChange={this.handleChange} />
          <label htmlFor='username'>Username:</label>
          <input id='username' type='username' name='username' value={username} onChange={this.handleChange} />
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <input type='submit' className="button" value='Signup' />
        </form>

        <p>Already have account?
          <Link to={'/login'}> Login</Link>
        </p>

      </>
    )
  }
}

export default withAuth(Signup);