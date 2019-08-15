import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import challengeService from '../services/challenges-service'

class CreateChallenge extends Component {


  state = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    startVotingDate: '',
    endVotingDate: '',
    creator: 'userId',
    illustrators: 0,
    totalVotes:0,
    redirect: false,
  }

  handleOnChange = (event) => {
    const {id, value} = event.target
    this.setState({
      [id]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, description, startDate, endDate, startVotingDate, endVotingDate, creator, illustrators, totalVotes} = this.state
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
    }

    challengeService.addOneChallenge(newChallenge)
    .then(response => {
      this.setState({
        redirect:true
      })
    })
    .catch(error => console.log(error));
  }

  render() {
    const {name, description, startDate, endDate, startVotingDate, endVotingDate, redirect} = this.state
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" value={name} onChange={this.handleOnChange} />
          
          <label htmlFor="name">Description</label>
          <input type="text" id="description" placeholder="Description" value={description} onChange={this.handleOnChange} />
          
          <label htmlFor="startDate">Start date</label>
          <input type="date" id="startDate" placeholder="startDate" value={startDate} onChange={this.handleOnChange} />
          
          <label htmlFor="endDate">End date</label>
          <input type="date" id="endDate" placeholder="endDate" value={endDate} onChange={this.handleOnChange} />

          <label htmlFor="startVotingDate">Start voting date</label>
          <input type="date" id="startVotingDate" placeholder="startVotingDate" value={startVotingDate} onChange={this.handleOnChange} />
          
          <label htmlFor="endVotingDate">End date</label>
          <input type="date" id="endVotingDate" placeholder="endVotingDate" value={endVotingDate} onChange={this.handleOnChange} />
          <button type="submit">Add new Challenge</button>
        </form>
        {redirect ? <Redirect to='/' />: null}
      </>
    )
  }
}

export default CreateChallenge;