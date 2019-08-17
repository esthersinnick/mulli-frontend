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
        console.log(response.data.listOfChallenges);
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
      <>
        <h1>Challenges List</h1>
        {user.isAdmin ?
          <Link to="/challenges/manager/add" className="button">
            Create a new Challenge
        </Link> : null}
        {challenges.length > 0 ? (
          <ul>
            {challenges.map(challenge => {
              return (
                <li key={challenge._id}>
                  <Link to={`/challenges/${challenge._id}`} ><h3>{challenge.name}</h3></Link>
                  {challenge.illustrators ?
                    <p>{challenge.illustrators} joined</p>
                    : null}
                  {challenge.totalVotes ?
                    <p>{challenge.totalVotes} votes</p>
                    : null}
                  <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                  {challenge.description ?
                    <p>{challenge.description}</p>
                    : null}
                  {challenge.status === "active" ?
                    <button>Join</button>
                    : null}

                  {user.isAdmin ?
                    <>
                      <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                      <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>
                    </> : null
                  }
                </li>
              );
            })}
          </ul>
        ) : (
            <p>Loading...</p>
          )}
      </>
    )
  }
}

export default withAuth(ChallengeList);
