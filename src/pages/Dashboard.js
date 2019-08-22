import React, { Component } from 'react'
import withAuth from '../components/withAuth';
import authService from "../services/auth-service"
import artService from '../services/art-service';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  state = {
    isAdmin: false,
    name: '',
    username: '',
    email: '',
    instagram: '',
    website: '',
    avatar: '',
    active: [],
    voting: [],
    closed: []
  }

  componentDidMount() {
    //const userId = this.props.user._id
    authService
      .me()
      .then(response => {
        this.setState({
          isAdmin: response.isAdmin,
          name: response.name,
          username: response.username,
          email: response.email,
          instagram: response.instagram,
          website: response.website,
          avatar: response.avatar
        })
      })
    artService.getAllMyArts()
      .then(response => {
        const myArts = response.data.listOfArts;
        this.setState({
          active: myArts.filter(art => art.challenge.status === "active"),
          voting: myArts.filter(art => art.challenge.status === "voting"),
          closed: myArts.filter(art => art.challenge.status === "closed")
        })
      })
  }


  render() {
    const { isAdmin, name, username, email, instagram, website, avatar, active, voting, closed } = this.state
    return (
      <>
        <h1>Dashboard</h1>
        <section className="profile">
          {/* <img src={avatar} alt={name} /> */}
          <h3>{name}</h3>
          <p>{username}</p>
          <p>{email}</p>
          <p>{instagram}</p>
          <p>{website}</p>
        </section>

        {isAdmin &&
          <section className="admin">
            <Link to="/challenges/manager" className="button">
              Challenge Manager
            </Link>
          </section>
        }

        <section className="challenges-dashboard">
          <section className="active-challenges">
            <h2>Joining</h2>
            {active.map((art, index) => {
              return (
                <article key={art._id} id={art._id}>
                  <header>
                    <Link to={`./challenges/${art.challenge._id}`}><h3>{art.challenge.name}</h3></Link>
                  </header>
                  <main>
                    {art.images.length > 0 && <img src={art.images[0]} alt={name} width="100%" />}
                  </main>
                </article>
              )
            })}
          </section>
          <section className="voting-challenges">
            <h2>Voting</h2>
            {voting.map((art, index) => {
              return (
                <article key={art._id} id={art._id}>
                  <header>
                    <Link to={`./challenges/${art.challenge._id}`}><h3>{art.challenge.name}</h3></Link>
                  </header>
                  <main>
                    <img src={art.images[0]} alt={name} width="100%" />
                  </main>
                </article>
              )
            })}
          </section>
          <section className="closed-challenges">
            <h2>Closed</h2>
            {closed.map((art, index) => {
              return (
                <article key={art._id} id={art._id}>
                  <header>
                    <Link to={`./challenges/${art.challenge._id}`}><h3>{art.challenge.name}</h3></Link>
                  </header>
                  <main>
                    <img src={art.images[0]} alt={name} width="100%" />
                  </main>
                  <footer>

                  </footer>
                </article>
              )
            })}
          </section>
        </section >
      </>
    )
  }
}

export default withAuth(Dashboard);
