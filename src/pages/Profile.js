import React, { Component } from 'react';
import authService from '../services/auth-service';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    instagram: '',
    website: '',
    avatar: ''
  };

  componentDidMount() {
    authService.me().then(response => {
      this.setState({
        name: response.name,
        username: response.username,
        email: response.email,
        instagram: response.instagram,
        website: response.website,
        avatar: response.avatar
      });
    });
  }

  handleOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { name, username, email, instagram, website } = this.state;
    await authService.update({ name, username, email, instagram, website });
    this.props.history.push('/dashboard');
  };

  render() {
    const { name, username, instagram, website, avatar } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Profile</h1>

        <label htmlFor="avatar">
          <img
            src={avatar}
            alt={name}
            style={{ height: '50px', width: '50px', border: '1px solid #ddd' }}
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            style={{ display: 'none' }}
            onChange={this.handleOnChange}
          />
        </label>

        <div>
          <label htmlFor="name" />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="username" />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="instagram" />
          <input
            type="url"
            name="instagram"
            id="instagram"
            value={instagram}
            onChange={this.handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="website" />
          <input
            type="url"
            name="website"
            id="website"
            value={website}
            onChange={this.handleOnChange}
          />
        </div>

        <button>Update profile</button>
      </form>
    );
  }
}

export default withRouter(Profile);