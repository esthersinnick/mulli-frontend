import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import challengeService from "../services/challenges-service";
import ChallengeForm from "../components/ChallengeForm";

class CreateChallenge extends Component {
  state = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startVotingDate: "",
    endVotingDate: "",
    illustrators: 0,
    totalVotes: 0
  };

  handleOnChange = event => {
    event.preventDefault();
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      description,
      startDate,
      endDate,
      startVotingDate,
      endVotingDate,
      creator,
      illustrators,
      totalVotes
    } = this.state;
    const newChallenge = {
      name,
      description,
      startDate,
      endDate,
      startVotingDate,
      endVotingDate,
      creator,
      illustrators,
      totalVotes
    };

    challengeService
      .addOneChallenge(newChallenge)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  render() {
    const {
      name,
      description,
      startDate,
      endDate,
      startVotingDate,
      endVotingDate
      // handleOnChange,
      // handleSubmit
    } = this.state;

    return (
      <ChallengeForm
        name={name}
        description={description}
        startDate={startDate}
        endDate={endDate}
        startVotingDate={startVotingDate}
        endVotingDate={endVotingDate}
        handleOnChange={this.handleOnChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default withRouter(CreateChallenge);
