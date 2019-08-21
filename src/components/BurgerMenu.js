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

  styles = {
    bmItemList: {
      height: '80%'
    },
  }

  render() {
    return (
      <>
        <Menu disableAutoFocus isOpen={this.state.areMenusOpen} styles={this.styles} right customBurgerIcon={<img src="/images/heart.svg" alt="burger menu icon" onClick={this.handleClickMenu} />}>
          {this.props.isLoggedIn ?
            (
              <>
                <div className="profile-info">
                  <h3>{this.props.user.name}</h3>
                  <p>{this.props.user.username}</p>
                </div>
                <div className="navigation-links">
                  <Link id="challenges" className="menu-item" to="/challenges" onClick={this.handleClickMenu}>Challenges</Link>
                  <Link id="dashboard" className="menu-item" to="/dashboard" onClick={this.handleClickMenu}>My Dashboard</Link>
                  <Link id="profile" className="menu-item" to="/profile" onClick={this.handleClickMenu}>Edit Profile</Link>
                </div>
                <div className="admin-links">
                  {this.props.user.isAdmin && <Link id="admin-challenges" className="menu-item" to="/challenges/manager" onClick={this.handleClickMenu}>Challenge Manager</Link>}
                </div>
                <div className="logout-links">
                  <Link className="button menu-item" onClick={this.props.logout} to="">Log out</Link>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <div>
                  <h3>Wellcome, little mullier!</h3>
                  <div className="auth-login">
                    <p>Alredy have an account?</p>
                    <Link className="button menu-item" to='/login'>Log in</Link>
                  </div>
                  <div className="auth-signup">
                    <p>Not a user yet?</p>
                    <Link className="button menu-item" to='/signup'>Sign up</Link>
                  </div>
                </div>
              </div>
            )}

        </Menu>
      </>
    );
  }
}

export default withAuth(BurgerMenu);
//https://github.com/negomi/react-burger-menu
