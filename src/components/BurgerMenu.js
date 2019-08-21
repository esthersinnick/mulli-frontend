import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';
import withAuth from './withAuth';
import { Link } from 'react-router-dom';

class BurgerMenu extends Component {

  state = {
    areMenusOpen: null
  }

  closeAllMenusOnEsc = (event) => {
    event = event || window.event;

    if (event.key === 'Escape' || event.keyCode === 27) {
      this.setState({ areMenusOpen: false });
    }
  };

  handleClickMenu = (event) => {
    console.log(this.state.areMenusOpen)
    if (this.state.areMenusOpen === null) {
      this.setState({ areMenusOpen: false });
    } else {
      this.setState({ areMenusOpen: null });
    }
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Menu isOpen={this.state.areMenusOpen} right customBurgerIcon={<img src="../images/heart.svg" alt="burger menu icon" onClick={this.handleClickMenu} />}>
          {this.props.isLoggedIn ?
            (
              <>
                <p>username: {this.props.user.username}</p>
                <Link onClick={this.props.logout}>Logout</Link>
                <Link id="dashboard" className="menu-item" to="/dashboard" onClick={this.handleClickMenu}>My Dashboard</Link>
                <Link id="profile" className="menu-item" to="/profile" onClick={this.handleClickMenu}>Edit Profile</Link>
                <Link id="challenges" className="menu-item" to="/challenges" onClick={this.handleClickMenu}>Challenges</Link>
              </>
            ) : (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </>
            )}

        </Menu>
      </>
    );
  }
}

export default withAuth(BurgerMenu);
//https://github.com/negomi/react-burger-menu
