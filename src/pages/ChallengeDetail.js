import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import UploadArtForm from '../components/UploadArtForm';
import { ReactComponent as HeartIcon } from '../svg/heart.svg'
import { ReactComponent as MedalIcon } from '../svg/award.svg'

import challengeService from "../services/challenges-service";
import artService from "../services/art-service";

import moment from "moment";


const colors = ['#1D90BC', '#154B6B', '#648ADF', '#FC9566', '#F9C942', '#27285D'];
const bgs = ['challenge_bg01.png', 'challenge_bg02.png', 'challenge_bg03.png', 'challenge_bg04.png', 'challenge_bg05.png', 'challenge_bg06.png'];
const pickColor = () => {
  const index = Math.round(Math.random() * (colors.length - 1));
  return colors[index]
}
const pickBg = () => {
  const index = Math.round(Math.random() * (bgs.length - 1));
  return bgs[index]
}

const randomBgColor = {
  backgroundColor: pickColor(),
  backgroundImage: `url(/images/${pickBg()})`,
  backgroundSize: 'contain'
}


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
    myVotesIds: [],
  };

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
            }).catch(error => console.log(error))
        }
      }
      ).then(response => {
        if (this.state.status === "voting") {
          artService.getMyVotedArtsOfChallenge(challengeId)
            .then(response => {

              this.setState({
                myVotes: response.data.listOfArts,
                myVotesIds: response.data.listOfArts.map(art => art._id)
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
              myVotes: response.data.listOfArts,
              myVotesIds: response.data.listOfArts.map(art => art._id)
            })
          })
      })

  }

  setImage = (imageUrl) => {
    this.setState({
      myArt: { images: [imageUrl] }
    })
  }

  render() {
    const { myVotesIds, name, description, startDate, endDate, illustrators, totalVotes, status, isJoined, isArt, myArt, arts } = this.state;
    const { challengeId } = this.props.match.params;
    //const { user } = this.props;
    return (
      <>
        <section className="challenge-info" style={randomBgColor}>
          <div>
            <p className="challenge-tag">{status}</p>
            <h3>{name}</h3>

            <p>{moment(startDate).add(10, "days").calendar()} - {moment(endDate).add(10, "days").calendar()}</p>

            {description ? <p>{description}</p>
              : null
            }

            {
              status === "active" && !isJoined ?
                <button className="white-btn" onClick={this.joinChallenge}>Join</button>
                : null
            }
          </div>

        </section>


        {status === "active" && isJoined && !isArt ?

          <UploadArtForm challengeId={challengeId} getIsArt={this.getIsArt} setImage={this.setImage} />
          : null
        }

        {status === "active" && isJoined && myArt ?
          <section className="my-art">
            <article>
              <header>
                <h2>My art</h2>
              </header>
              <main>
                <div className="my-art-container">
                  <img src={myArt.images[0]} alt={`my art for ${name}`} width="100%" />
                </div>
              </main>
            </article>
          </section>
          : null
        }

        {/*si hay art, poder borrarla y que salga para subirla otra vez */}


        {/* Si el estado es voting*/}

        {status === "voting" &&
          <section className="voting-section">
            <p className="votting-title">This challenge is at voting process! </p>
            {status === "voting" && !isArt ?
              <p className="message">Only participants to this challenge can vote.</p> : null}
          </section>}


        {/* Si has participado (si isArt)*/}
        {status === "voting" && isArt ?
          <section className="my-art">
            <article class="">
              <header>
                <h2>My art</h2>
              </header>
              <main>
                <div className="my-art-container">
                  <img src={myArt.images[0]} alt="my art for the challenge" width="100%" />
                </div>
              </main>
            </article>
          </section>
          : null}

        {status === "voting" && arts && myArt ?
          <section className="list-of-arts">
            <h2>Vote!</h2>
            {arts.map((art, index) => {
              return (
                (art._id !== myArt._id &&
                  <article key={art._id} id={art._id}>
                    <main>
                      {myVotesIds.includes(art._id) ? <HeartIcon className="like-button liked" onClick={() => { this.handleLikes(art._id) }} /> : <HeartIcon className="like-button" onClick={() => { this.handleLikes(art._id) }} />}
                      <img src={art.images[0]} alt={`illustration ${index + 1} for ${name}`} width="100%" />
                    </main>
                  </article>))
            }
            )}
          </section>
          : null
        }

        {/* Si el estado es closed*/}
        {status === "closed" && arts ?

          < section className="list-of-arts closed">

            {arts.map((art, index) => (
              <article key={art._id}>
                <header>
                  <p>@{art.user.username}</p>
                </header>
                <main>
                  <img src={art.images[0]} alt={`illustration by ${art.user.email /* cambiar por name cuando haga el profile*/} for ${name}`} width="100%" />
                </main>
                <footer>
                  <p><HeartIcon className="heart" /> {art.votes.length} </p>
                  <p><MedalIcon className="medal" /> {index + 1}</p>
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