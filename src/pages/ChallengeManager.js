import React, { Component } from "react";
import { Link } from 'react-router-dom'
import challengeService from "../services/challenges-service";
import moment from "moment";

class ChallengeManager extends Component {
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
    return (
      <div>
        <h1>Challenge Manager</h1>
        <Link to="/challenges/manager/add" className="button">
          Create a new Challenge
        </Link>
        {challenges.length > 0 ? (
          <ul>
            {challenges.map(challenge => {
              return (
                <li key={challenge._id}>
                  <h3>{challenge.name}</h3>
                  <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                  <Link to={`/challenges/manager/${challenge._id}/edit`} className="button">Edit</Link>
                  <button onClick={() => { this.handleDeleteClick(challenge._id) }}>X</button>

                </li>
              );
            })}
          </ul>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}

export default ChallengeManager;
