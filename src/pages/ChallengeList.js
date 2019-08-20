import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import challengeService from '../services/challenges-service';
import artService from '../services/art-service';
import withAuth from '../components/withAuth';
import { Redirect } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';

class ChallengeList extends Component {
  state = {
    challenges: [],
    myChallenges: [],
    redirect: null
  };

  get activeChallenges() {
    return this.state.challenges.filter(
      challenge => challenge.status === 'active'
    );
  }
  get votingChallenges() {
    return this.state.challenges.filter(
      challenge => challenge.status === 'voting'
    );
  }
  get closedChallenges() {
    return this.state.challenges.filter(
      challenge => challenge.status === 'closed'
    );
  }

  componentDidMount() {
    const userId = this.props.user._id;

    challengeService
      .getAllChallenges()
      .then(response => {
        const challenges = response.data;
        this.setState({ challenges });
      })
      .catch(error => console.log(error));

    //get all muy joined challenges ids
    artService.getAllArtsOfUser(userId).then(response => {
      const myArts = response.data.listOfArts;
      const myChallenges = [];
      myArts.map(art => myChallenges.push(art.challenge));
      this.setState({
        myChallenges
      });
    });
  }

  handleDeleteClick = id => {
    const { challenges } = this.state;
    challengeService
      .deleteOneChallenge(id)
      .then(() => {
        const filteredChallenges = challenges.filter(challenge => {
          return challenge._id !== id;
        });
        this.setState({
          challenges: filteredChallenges
        });
      })
      .catch(error => console.log(error));
  };

  joinChallenge = async (challengeId) => {
    const newArt = {
      challenge: challengeId,
      image: '',
      votes: [],
      rankingPosition: 0
    };
    await artService
      .addOneArt(newArt, challengeId)
      .then(response => response)
      .catch(error => console.log(error));

    const myNewChallenges = [...this.state.myChallenges];
    myNewChallenges.push(challengeId);
    this.setState({
      myChallenges: myNewChallenges,
      redirect: challengeId
    });
  };
  showJoinButton = challenge => {
    const { myChallenges } = this.state;
    return !myChallenges.find(
      myChallenge => myChallenge.toString() === challenge._id
    );
  };

  render() {
    const { challenges } = this.state;
    const { user } = this.props;
    return (
      <div className="flex-column">
        {this.state.redirect && (
          <Redirect to={`/challenges/${this.state.redirect}`} />
        )}
        <h1>Challenges List</h1>
        {user.isAdmin ? (
          <Link to="/challenges/manager/add" className="button">
            Create a new Challenge
          </Link>
        ) : null}
        {challenges.length > 0 ? (
          <section className="challenges-list">
            <section className="active-challenges">
              <header>
                <h2>Current Challenges</h2>
              </header>
              <main>
                <ul>
                  {this.activeChallenges.map(challenge => (
                    <ChallengeCard
                      user={user}
                      challenge={challenge}
                      showJoinButton={this.showJoinButton(challenge)}
                      onJoin={() => this.joinChallenge(challenge._id)}
                      handleDeleteClick={this.handleDeleteClick.bind(
                        this,
                        challenge._id
                      )}
                      key={challenge._id}
                    />
                  ))}
                </ul>
              </main>
            </section>

            <section className="active-challenges">
              <header>
                <h2>Challenges to vote</h2>
              </header>
              <main>
                <ul>
                  {this.votingChallenges.map(challenge => (
                    <ChallengeCard
                      user={user}
                      challenge={challenge}
                      showJoinButton={this.showJoinButton(challenge)}
                      onJoin={() => this.joinChallenge(challenge._id)}
                      handleDeleteClick={this.handleDeleteClick.bind(
                        this,
                        challenge._id
                      )}
                    />
                  ))}
                </ul>
              </main>
            </section>

            <section className="active-challenges">
              <header>
                <h2>Closed challenges</h2>
              </header>
              <main>
                <ul>
                  {this.closedChallenges.map(challenge => (
                    <ChallengeCard
                      user={user}
                      challenge={challenge}
                      showJoinButton={this.showJoinButton(challenge)}
                      onJoin={() => this.joinChallenge(challenge._id)}
                      handleDeleteClick={this.handleDeleteClick.bind(
                        this,
                        challenge._id
                      )}
                    />
                  ))}
                </ul>
              </main>
            </section>
          </section>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}

export default withAuth(ChallengeList);