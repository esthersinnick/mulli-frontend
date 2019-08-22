import React, { Component } from 'react'
import { ReactComponent as HeartIcon } from '../svg/heart.svg'
import withAuth from '../components/withAuth';
import Navbar from '../components/Navbar';
import { ReactComponent as Logo } from '../svg/mulli_logo.svg'
import { Link } from 'react-router-dom';


class LandingPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <section className="wellcome">
          <p>Wellcome to</p>
          <Logo />
          {this.props.isLoggedIn ?
            <section className="for-users">
              <Link id="challenges" className="button" to="/challenges" >Challenges</Link>
            </section> :
            <section className="for-anon">
              <div className="auth-login">
                <p>Alredy have an account?</p>
                <Link className="button" to='/login'>Log in</Link>
              </div>
              <div className="auth-signup">
                <p>Not a user yet?</p>
                <Link className="button" to='/signup'>Sign up</Link>
              </div>
            </section>}
        </section>

      </>
    )
  }
}

export default withAuth(LandingPage);