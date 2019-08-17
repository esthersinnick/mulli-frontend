import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import challengeService from "../services/challenges-service";
import ChallengeForm from "../components/ChallengeForm";
import moment from "moment";


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

  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    const { challengeId } = this.props.match.params

    challengeService
      .getOneChallenge(challengeId)
      .then(response => {
        this.setState({
          status: response.data.status,
          name: response.data.name,
          description: response.data.description,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          startVotingDate: response.data.startVotingDate,
          endVotingDate: response.data.endVotingDate

        })
      })
      .catch(error => console.log(error));
  };

  handleOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, description, startDate, endDate, startVotingDate, endVotingDate, status } = this.state;
    const updateChallenge = {
      status,
      name,
      description,
      startDate,
      endDate,
      startVotingDate,
      endVotingDate,
    };

    const { challengeId } = this.props.match.params

    challengeService
      .updtateOneChallenge(challengeId, updateChallenge)
      .then(response => {
        this.props.history.push("/challenges/manager");
      })
      .catch(error => console.log(error));
  };

  render() {
    const { name, description, startDate, endDate, startVotingDate, endVotingDate, status } = this.state;
    return (
      <>
        <h1>Edit challenge</h1>
        <button onClick={this.goToPreviousPage}>Go Back</button>
        {name !== "" ? (
          <ChallengeForm
            status={status}
            name={name}
            description={description}
            startDate={moment(startDate).format("YYYY-MM-DD")}
            endDate={moment(endDate).format("YYYY-MM-DD")}
            startVotingDate={moment(startVotingDate).format("YYYY-MM-DD")}
            endVotingDate={moment(endVotingDate).format("YYYY-MM-DD")}
            handleOnChange={this.handleOnChange}
            handleSubmit={this.handleSubmit}
            buttonText="Update challenge"
          />) : null
        }
      </>
    );
  }
}

export default withRouter(CreateChallenge);
