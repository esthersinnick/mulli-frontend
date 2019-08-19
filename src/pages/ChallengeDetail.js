import React, { Component } from 'react';
//import { withRouter } from "react-router-dom";
import withAuth from '../components/withAuth';
import challengeService from "../services/challenges-service";
import artService from "../services/art-service";

import moment from "moment";
import UploadArtForm from '../components/UploadArtForm';
import image from 'react-firebase-file-uploader/lib/utils/image';

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
    totalVotes: 0,
    isJoined: false,
    isArt: false,
    myArt: null,
    arts: []
  };

  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  joinChallenge = () => {
    /* comprobar si este usuario ya tiene un arte xcreado apra este challenge */

    const { challengeId } = this.props.match.params;
    const newArt = {
      challenge: challengeId,
      image: '',
      votes: [],
      rankingPosition: 0
    }

    artService.addOneArt(newArt, challengeId)
      .then(response => response)
      .catch(error => console.log(error))

    this.setState({
      isJoined: true,
    })

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
          endVotingDate: response.data.endVotingDate,
          illustrators: response.data.illustrators,
          totalVotes: response.data.totalVotes,
        })
      })
      .catch(error => console.log(error));

    artService
      .getOneArtOfUserAndChallenge(challengeId)
      .then(response => {
        if (response.data.listOfArts.length > 0) {
          this.setState({
            isJoined: true,
          })
        }
        if (response.data.listOfArts.length > 0 && response.data.listOfArts[0].images.length > 0) {
          this.setState({
            isArt: true,
            myArt: response.data.listOfArts[0],
          })
        }
      }).catch(error => console.log(error))
  };

  getIsArt = () => {
    const { challengeId } = this.props.match.params
    this.setState({
      isArt: true,
    })


    artService
      .getOneArtOfUserAndChallenge(challengeId)
      .then(response => {
        this.setState({
          myArt: response.data.listOfArts[0],
        })
      })
  }

  setImage = (imageUrl) => {
    console.log(imageUrl)
    this.setState({
      myArt: { images: [imageUrl] }
    })

    console.log(this.state)
  }

  getArts = () => {
    const { challengeId } = this.props.match.params
    artService.getAllArtsOfChallenges(challengeId)
      .then(response => {
      }).catch(error => console.log(error))
  }


  render() {
    this.getArts();
    const { name, description, startDate, endDate, startVotingDate, endVotingDate, illustrators, totalVotes, status, isJoined, isArt, myArt, arts } = this.state;
    const { challengeId } = this.props.match.params;
    const { user } = this.props;
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

        {description ? <p>{description}</p>
          : null
        }

        {
          status === "active" && !isJoined ?
            <button onClick={this.joinChallenge}>Join</button>
            : null
        }

        {status === "active" && isJoined && !isArt ?
          <UploadArtForm challengeId={challengeId} getIsArt={this.getIsArt} setImage={this.setImage} />
          : null
        }

        {status === "active" && isJoined && myArt ?
          <section className="my-art">
            <article >
              <header>
                <p>My art</p>
              </header>
              <main>
                <img src={myArt.images[0]} alt={`my art for ${name}`} />
              </main>
            </article>
          </section>
          : null
        }

        {/*si hay art, poder borrarla y que salga para subirla otra vez */}


        {/* Si el estado es voting*/}
        {status === "voting" ?
          <p>This challenge is at voting process! </p>
          : null}
        {status === "voting" && !isArt ?
          <p>Only participants to this challenge can vote.</p> : null}


        {/* Si has participado (si isArt)*/}
        {status === "voting" && isArt ?
          <section className="my-art">
            <article>
              <header>
                <p>My art</p>
              </header>
              <main>
                <img src={myArt.images[0]} alt="asdnfa" />
              </main>
            </article>
          </section>
          : null}


        {/*que no muestre mi art*/}
        {/* {status === "voting" ?

          < section className="list-of-arts">

            {arts.map(art => {
              <article key={art._id}>
              </article>
            })}
          </section>
          : null
        } */}

        {/* Si el estado es closed*/}
        <article>
        </article>
      </>
    )
  }
}

export default withAuth(ChallengeDetail);