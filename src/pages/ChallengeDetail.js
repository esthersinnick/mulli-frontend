import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import withAuth from '../components/withAuth';
import challengeService from "../services/challenges-service";
import artService from "../services/art-service";

import moment from "moment";
import UploadArtForm from '../components/UploadArtForm';

class ChallengeDetail extends Component {
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

  joinChallenge = () => {
    const { challengeId } = this.props.match.params;
    const newArt = {
      challenge: challengeId,
      image: '',
      votes: [],
      rankingPosition: 0
    }

    artService.addOneArt(newArt)
      .then(response => response)
      .catch(error => console.log(error))

  }

  componentDidMount() {
    const { challengeId } = this.props.match.params

    challengeService
      .getOneChallenge(challengeId)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          startVotingDate: response.data.startVotingDate,
          endVotingDate: response.data.endVotingDate,
          illustrators: response.data.illustrators,
          totalVotes: response.data.totalVotes
        })
      })
      .catch(error => console.log(error));
  };


  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  render() {
    const { name, description, startDate, endDate, startVotingDate, endVotingDate, illustrators, totalVotes, status } = this.state;
    const { challengeId } = this.props.match.params
    return (
      <>
        <button onClick={this.goToPreviousPage}>Go Back</button>
        <h2>{name}</h2>

        {
          illustrators ?
            <p>{illustrators} joined</p>
            : null
        }
        {
          totalVotes ?
            <p>{totalVotes} votes</p>
            : null
        }
        <p>{moment(startDate).add(10, "days").calendar()} - {moment(endDate).add(10, "days").calendar()}</p>
        {
          description ?
            <p>{description}</p>
            : null
        }

        {
          status === "active" ?
            <button onClick={this.joinChallenge}>Join</button>
            : null
        }

        {/*if art of user and challenge exist*/}
        <UploadArtForm challengeId={challengeId} />

        {/* */}
      </>
    )
  }
}

export default withAuth(ChallengeDetail);