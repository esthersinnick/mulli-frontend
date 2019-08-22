import React, { Component } from 'react';
import withAuth from '../components/withAuth';

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
    const user = this.props.user
    this.setState({
      name: user.name,
      username: user.username,
      email: user.email,
      instagram: user.instagram,
      website: user.website,
      avatar: user.avatar
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

    await this.props.userUpdate({ name, username, email, instagram, website });
    this.props.history.push('/dashboard');
  };

  render() {
    const { name, username, instagram, website, avatar } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Profile</h1>

        {/* <label htmlFor="avatar">
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
        </label> */}

        <label htmlFor="name" />
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleOnChange}
        />

        <label htmlFor="username" />
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={this.handleOnChange}
        />

        <label htmlFor="instagram" />
        <input
          type="url"
          name="instagram"
          id="instagram"
          value={instagram}
          onChange={this.handleOnChange}
        />

        <label htmlFor="website" />
        <input
          type="url"
          name="website"
          id="website"
          value={website}
          onChange={this.handleOnChange}
        />

        <button>Update profile</button>
      </form>
    );
  }
}

export default withAuth(Profile);