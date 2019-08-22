import React from "react";

const ChallengeForm = props => {
  const {
    status,
    name,
    description,
    startDate,
    endDate,
    startVotingDate,
    endVotingDate,
    handleOnChange,
    handleSubmit,
    buttonText
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
    <form className="challenge-form" onSubmit={submitForm}>

      <label htmlFor="status">Status</label>
      <select name="status" id="status" defaultValue={status} onChange={changeInput}>
        <option>active</option>
        <option>voting</option>
        <option>closed</option>
      </select>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={changeInput}
        required
      />

      <label htmlFor="name">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={changeInput}
        required
      />
      <label>Active</label>
      <div className="date-form">
        <input
          type="date"
          id="startDate"
          name="startDate"
          placeholder="startDate"
          value={startDate}
          onChange={changeInput}
          required
        />
        <input
          type="date"
          id="endDate"
          name="endDate"
          placeholder="endDate"
          value={endDate}
          onChange={changeInput}
          required
        />

      </div>
      <label>Voting</label>
      <div className="date-form">
        <input
          type="date"
          id="startVotingDate"
          name="startVotingDate"
          placeholder="startVotingDate"
          value={startVotingDate}
          onChange={changeInput}
          required
        />
        <input
          type="date"
          id="endVotingDate"
          name="endVotingDate"
          placeholder="endVotingDate"
          value={endVotingDate}
          onChange={changeInput}
          required
        />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ChallengeForm;
