import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import challengeService from "../services/challenges-service";
import artService from "../services/art-service";
import withAuth from '../components/withAuth';
import moment from "moment";
import { Redirect } from 'react-router-dom'

class ChallengeList extends Component {

  state = {
    activeChallenges: [],
    votingChallenges: [],
    closedChallenges: [],
    challenges: [],
    myChallenges: [],
    redirect: false
  };


  renderRedirect = (challengeId) => {
    if (this.state.redirect) {
      return <Redirect to={`/challenges/${challengeId}`} />
    }
  }

  componentDidMount() {
    const userId = this.props.user._id

    challengeService.getAllChallenges()
      .then(response => {
        const challenges = response.data
        this.setState({
          challenges,
          activeChallenges: challenges.filter(challenge => challenge.status === "active"),
          votingChallenges: challenges.filter(challenge => challenge.status === "voting"),
          closedChallenges: challenges.filter(challenge => challenge.status === "closed")
        });
      })
      .catch(error => console.log(error));

    //get all muy joined challenges ids
    artService.getAllArtsOfUser(userId)
      .then(response => {
        const myArts = response.data.listOfArts;
        const myChallenges = []
        myArts.map(art => {
          myChallenges.push(art.challenge)
        })
        console.log(myChallenges)
        this.setState({
          myChallenges,
        })

      })
  }

  handleDeleteClick = (id) => {
    const { challenges } = this.state;
    challengeService.deleteOneChallenge(id)
      .then(() => {
        const filteredChallenges = challenges.filter((challenge) => {
          return challenge._id !== id
        })
        this.setState({
          challenges: filteredChallenges
        })
      })
      .catch(error => console.log(error))
  }

  joinChallenge = async (challengeId) => {
    const newArt = {
      challenge: challengeId,
      image: '',
      votes: [],
      rankingPosition: 0
    }
    await artService.addOneArt(newArt, challengeId)
      .then(response => response)
      .catch(error => console.log(error))

    const myNewChallenges = [...this.state.myChallenges]
    myNewChallenges.push(challengeId)
    this.setState({
      myChallenges: myNewChallenges,
      redirect: true
    })
  }
  showChallenge = (id) => {
    const { myChallenges } = this.state;
    return !myChallenges.find(myChallenge => myChallenge.toString() === id)
  }

  render() {
    const { challenges, myChallenges, activeChallenges, votingChallenges, closedChallenges } = this.state;
    const { user } = this.props;
    return (
      <div className="flex-column">
        <h1>Challenges List</h1>
        {user.isAdmin ?
          <Link to="/challenges/manager/add" className="button">
            Create a new Challenge
          </Link> : null}
        {challenges.length > 0 ? (

          <section className="challenges-list">
            <section className="active-challenges">
              <header>
                <h2>Current Challenges</h2>
              </header>
              <main>
                <ul>
                  {activeChallenges.map(challenge => {
                    return (
                      <li key={challenge._id} className="challenge-item">
                        {console.log(challenge._id)}
                        <div className="challenge-content">
                          <p className="challenge-tag">Active</p>
                          <Link to={`/challenges/${challenge._id}`} ><h3>{challenge.name}</h3></Link>
                          <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                          {challenge.description ?
                            <p>{challenge.description}</p>
                            : null}
                        </div>
                        <div className="challenge-footer">
                          <div className="info">
                            {challenge.illustrators ?
                              <div className="info-users">
                                <img src="../images/user.png" alt="users who had joined this challenge" />
                                <p>{challenge.illustrators}</p>
                              </div>
                              : null}
                            {/* {challenge.totalVotes ?
                          <div className="info-likes">
                            <img src="../images/heart.png" alt="total of votes on this challenge" />
                            <p>{challenge.totalVotes}</p>
                          </div>
                          : null} */}

                            {this.renderRedirect(challenge._id)}
                            {this.showChallenge(challenge._id) ?
                              <button onClick={() => { this.joinChallenge(challenge._id) }}>Join</button>
                              : null}
                          </div>

                          {user.isAdmin ?
                            <div className="challenge-admin">
                              <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                              <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>
                            </div> : null
                          }
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </main>

            </section>

            <section className="active-challenges">
              <header>
                <h2>Challenges to vote</h2>
              </header>
              <main>
                <ul>
                  {votingChallenges.map(challenge => {
                    return (
                      <li key={challenge._id} className="challenge-item">
                        {console.log(challenge._id)}
                        <div className="challenge-content">
                          <p className="challenge-tag">Voting</p>
                          <Link to={`/challenges/${challenge._id}`} ><h3>{challenge.name}</h3></Link>
                          <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                          {challenge.description ?
                            <p>{challenge.description}</p>
                            : null}
                        </div>
                        <div className="challenge-footer">
                          <div className="info">
                            {challenge.illustrators ?
                              <div className="info-users">
                                <img src="../images/user.png" alt="users who had joined this challenge" />
                                <p>{challenge.illustrators}</p>
                              </div>
                              : null}
                            {/* {challenge.totalVotes ?
                          <div className="info-likes">
                            <img src="../images/heart.png" alt="total of votes on this challenge" />
                            <p>{challenge.totalVotes}</p>
                          </div>
                          : null} */}
                          </div>

                          {user.isAdmin ?
                            <div className="challenge-admin">
                              <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                              <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>
                            </div> : null
                          }
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </main>

            </section>

            <section className="active-challenges">
              <header>
                <h2>Closed challenges</h2>
              </header>
              <main>
                <ul>
                  {closedChallenges.map(challenge => {
                    return (
                      <li key={challenge._id} className="challenge-item">
                        {console.log(challenge._id)}
                        <div className="challenge-content">
                          <p className="challenge-tag">Closed</p>
                          <Link to={`/challenges/${challenge._id}`} ><h3>{challenge.name}</h3></Link>
                          <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                          {challenge.description ?
                            <p>{challenge.description}</p>
                            : null}
                        </div>
                        <div className="challenge-footer">
                          <div className="info">
                            {challenge.illustrators ?
                              <div className="info-users">
                                <img src="../images/user.png" alt="users who had joined this challenge" />
                                <p>{challenge.illustrators}</p>
                              </div>
                              : null}
                            {/* {challenge.totalVotes ?
                          <div className="info-likes">
                            <img src="../images/heart.png" alt="total of votes on this challenge" />
                            <p>{challenge.totalVotes}</p>
                          </div>
                          : null} */}
                          </div>

                          {user.isAdmin ?
                            <div className="challenge-admin">
                              <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                              <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>
                            </div> : null
                          }
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </main>
            </section>
          </section>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    )
  }
}

export default withAuth(ChallengeList);
