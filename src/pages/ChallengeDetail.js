import React, { Component } from 'react';
//import { withRouter } from "react-router-dom";
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
    totalVotes: 0,
    isJoined: false,
    isArt: false,
    myArt: null,
    arts: [],
    myVotes: [],
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
          endVotingDate: response.data.endVotingDate,
          illustrators: response.data.illustrators,
          totalVotes: response.data.totalVotes,
        })
      }).then(response => {

        if (this.state.status === "voting") {
          artService.getAllArtsOfChallenges(challengeId)
            .then(response => {
              this.setState({
                arts: response.data.listOfArts.sort(() => 0.5 - Math.random()),
              })
              console.log("arts: ", this.state.arts)
            }).catch(error => console.log(error))
        }
      }
      ).then(response => {
        if (this.state.status === "voting") {
          artService.getMyVotedArtsOfChallenge(challengeId)
            .then(response => {
              this.setState({
                myVotes: response.data.listOfArts
              })
            })
        }

      }).then(response => {
        if (this.state.status === "closed") {
          artService.getAllArtsOfChallenges(challengeId)
            .then(response => {
              this.setState({
                arts: response.data.listOfArts.sort((a, b) => b.votes.length - a.votes.length),
              })
            }).catch(error => console.log(error))
        }
      }
      )
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

  joinChallenge = () => {
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

  handleLikes = (artId) => {
    const { challengeId } = this.props.match.params
    artService.voteArt(artId)
      .then(response => {
        console.log(response)
      }).then(response => {
        artService.getMyVotedArtsOfChallenge(challengeId)
          .then(response => {
            this.setState({
              myVotes: response.data.listOfArts
            })
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

  render() {
    const { name, description, startDate, endDate, illustrators, totalVotes, status, isJoined, isArt, myArt, arts, myVotes } = this.state;
    const { challengeId } = this.props.match.params;
    //const { user } = this.props;
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
                <img src={myArt.images[0]} alt={`my art for ${name}`} width="100%" />
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
                <img src={myArt.images[0]} alt="my art for the challenge" width="100%" />
              </main>
            </article>
          </section>
          : null}


        {/*que no muestre mi art*/}
        {status === "voting" && arts ?

          < section className="list-of-arts">

            {arts.map((art, index) => {
              if (art._id !== myArt._id) {
                return (
                  <article key={art._id} id={art._id}>
                    <main>
                      <img src={art.images[0]} alt={`illustration ${index + 1} for ${name}`} width="100%" />
                    </main>
                    <footer>
                      {/* {(myVotes.includes(art._id)) ? ( */}
                      <button className="" onClick={() => { this.handleLikes(art._id) }}>Like it!</button>
                      {/* ) : null
                      } */}
                    </footer>
                  </article>
                )
              }
            })}
          </section>
          : null
        }

        {/* Si el estado es closed*/}
        {status === "closed" && arts ?

          < section className="list-of-arts">

            {arts.map((art, index) => (
              <article key={art._id}>
                <header>
                  <p>${art.user.email}</p>
                </header>
                <main>
                  <img src={art.images[0]} alt={`illustration by ${art.user.email /* cambiar por name cuando haga el profile*/} for ${name}`} width="100%" />
                </main>
                <footer>
                  <p>votes: {art.votes.length} </p>
                  <p>Ranking:{index + 1}</p>
                </footer>

              </article>
            ))}
          </section>
          : null
        }

        <article>
        </article>
      </>
    )
  }
}

export default withAuth(ChallengeDetail);