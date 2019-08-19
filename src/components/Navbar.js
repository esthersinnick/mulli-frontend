import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './withAuth';

class Navbar extends Component {
  render() {
    return (
      <nav>
        {this.props.isLoggedIn ?
          (
            <>
              <p>username: {this.props.user.username}</p>
              <p onClick={this.props.logout}>Logout</p>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )}


      </nav>
    )
  }
}

export default withAuth(Navbar);