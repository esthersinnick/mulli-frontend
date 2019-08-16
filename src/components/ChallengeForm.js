import React from "react";

const ChallengeForm = props => {
  const {
    name,
    description,
    startDate,
    endDate,
    startVotingDate,
    endVotingDate,
    handleOnChange,
    handleSubmit
  } = props;

  const submitForm = e => {
    e.preventDefault();
    handleSubmit(e);
  };
  const changeInput = e => {
    e.preventDefault();
    handleOnChange(e);
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={changeInput}
      />

      <label htmlFor="name">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={changeInput}
      />

      <label htmlFor="startDate">Start date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        placeholder="startDate"
        value={startDate}
        onChange={changeInput}
      />

      <label htmlFor="endDate">End date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        placeholder="endDate"
        value={endDate}
        onChange={changeInput}
      />

      <label htmlFor="startVotingDate">Start voting date</label>
      <input
        type="date"
        id="startVotingDate"
        name="startVotingDate"
        placeholder="startVotingDate"
        value={startVotingDate}
        onChange={changeInput}
      />

      <label htmlFor="endVotingDate">End date</label>
      <input
        type="date"
        id="endVotingDate"
        name="endVotingDate"
        placeholder="endVotingDate"
        value={endVotingDate}
        onChange={changeInput}
      />
      <button type="submit">Add new Challenge</button>
    </form>
  );
};

export default ChallengeForm;
