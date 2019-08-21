import React, { Component } from 'react';
import withAuth from './withAuth';
import BurgerMenu from './BurgerMenu';

class Navbar extends Component {
  render() {
    return (
      <>
        <nav>
          <BurgerMenu />
        </nav>

      </>
    )
  }
}

export default withAuth(Navbar);