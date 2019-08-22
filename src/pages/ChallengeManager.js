import React, { Component } from "react";
import { Link } from 'react-router-dom'
import challengeService from "../services/challenges-service";

import { ReactComponent as EditIcon } from '../svg/pencil.svg'
import { ReactComponent as RemoveIcon } from '../svg/remove.svg'

import moment from "moment";

class ChallengeManager extends Component {
  state = {
    challenges: []
  };

  componentDidMount() {
    challengeService
      .getAllChallenges()
      .then(response => {
        console.log(response);
        this.setState({
          challenges: response.data
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
      <div className="manager">
        <h1>Challenge Manager</h1>
        <Link to="/challenges/manager/add" className="button">
          Create a new Challenge
        </Link>
        {challenges.length > 0 ? (
          <table className="manager-table">
            {challenges.map(challenge => {
              return (
                <tr key={challenge._id}>
                  <td>
                    <h3>{challenge.name}</h3>
                    <p>{moment(challenge.startDate).add(10, "days").calendar()} - {moment(challenge.endDate).add(10, "days").calendar()}</p>
                  </td>
                  <td>
                    <div className="challenge-admin challenge-manager">
                      <Link to={`/challenges/manager/${challenge._id}/edit`}><EditIcon /></Link>
                      <div className="remove" onClick={() => this.handleDeleteClick(challenge._id)}><RemoveIcon /></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}

export default ChallengeManager;
