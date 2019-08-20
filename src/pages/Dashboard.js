import React, { Component } from 'react'
import withAuth from '../components/withAuth';
import authService from "../services/auth-service"
import artService from '../services/art-service';

class Dashboard extends Component {
  state = {
    isAdmin: false,
    name: '',
    username: '',
    email: '',
    instagram: '',
    website: '',
    avatar: '',
    myArts: []
  }

  componentDidMount() {
    const userId = this.props.user._id
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
        console.log(response)
        this.setState({
          myArts: response.data.listOfArts,
        })
      })
  }


  render() {
    const { name, username, email, instagram, website, avatar, myArts } = this.state
    return (
      <>
        <h1>Dashboard</h1>
        <section className="profile">
          <img src={avatar} alt={name} />
          <p>{name}</p>
          <p>{username}</p>
          <p>{email}</p>
          <p>{instagram}</p>
          <p>{website}</p>
        </section>

        <section className="challenges">

          {myArts.map((art, index) => {
            return (
              <article key={art._id} id={art._id}>
                <main>
                  <img src={art.images[0]} alt={name} width="100%" />
                </main>
              </article>
            )
          })}

        </section>
      </>
    )
  }
}

export default withAuth(Dashboard);
