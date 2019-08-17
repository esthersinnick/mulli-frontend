import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import challengeService from "../services/challenges-service";
import ChallengeForm from "../components/ChallengeForm";

class CreateChallenge extends Component {
  state = {
    status: "active",
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
    console.log(event.nativeEvent)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      status,
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
      status,
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
        this.props.history.goBack();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { status, name, description, startDate, endDate, startVotingDate, endVotingDate } = this.state;

    return (
      <>
        <h1>Create new challenge</h1>
        <button onClick={this.goToPreviousPage}>Go Back</button>
        <ChallengeForm
          status={status}
          name={name}
          description={description}
          startDate={startDate}
          endDate={endDate}
          startVotingDate={startVotingDate}
          endVotingDate={endVotingDate}
          handleOnChange={this.handleOnChange}
          handleSubmit={this.handleSubmit}
          buttonText="Add new challenge"
        />
      </>
    );
  }
}

export default withRouter(CreateChallenge);
