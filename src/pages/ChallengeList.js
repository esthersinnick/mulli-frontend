import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import challengeService from "../services/challenges-service";
import withAuth from '../components/withAuth';
import moment from "moment";

class ChallengeList extends Component {

  state = {
    challenges: []
  };

  componentDidMount() {
    challengeService
      .getAllChallenges()
      .then(response => {
        this.setState({
          challenges: response.data.listOfChallenges
        });
      })
      .catch(error => console.log(error));
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

  render() {
    const { challenges } = this.state;
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
            <ul>
              {challenges.map(challenge => {
                return (
                  <li key={challenge._id} className="challenge-item">
                    <Link to={`/challenges/${challenge._id}`} >
                      <div className="challenge-content">
                        <h3>{challenge.name}</h3>
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
                          {challenge.totalVotes ?
                            <div className="info-likes">
                              <img src="../images/heart.png" alt="total of votes on this challenge" />
                              <p>{challenge.totalVotes}</p>
                            </div>
                            : null}

                          {challenge.status === "active" ?
                            <button>Join</button>
                            : null}
                        </div>

                        {user.isAdmin ?
                          <div className="challenge-admin">
                            <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                            <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>
                          </div> : null
                        }

                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

          </section>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    )
  }
}

export default withAuth(ChallengeList);
