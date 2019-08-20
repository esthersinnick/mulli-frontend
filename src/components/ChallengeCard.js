import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ChallengeCard = ({
  challenge,
  user,
  handleDeleteClick = () => { },
  onJoin = () => { },
  showJoinButton = false
}) => {
  return (
    <div className="challenge-item">
      <div className="challenge-content">
        <p className="challenge-tag">{challenge.status}</p>
        <Link to={`/challenges/${challenge._id}`}>
          <h3>{challenge.name}</h3>
        </Link>
        <p>
          {moment(challenge.startDate)
            .add(10, 'days')
            .calendar()}{' '}
          -{' '}
          {moment(challenge.endDate)
            .add(10, 'days')
            .calendar()}
        </p>
        {challenge.description && <p>{challenge.description}</p>}
      </div>
      <div className="challenge-footer">
        <div className="info">
          {challenge.illustrators && (
            <div className="info-users">
              <img
                src="../images/user.png"
                alt="users who had joined this challenge"
              />
              <p>{challenge.illustrators}</p>
            </div>
          )}
          {challenge.status === 'active' && showJoinButton && (
            <button onClick={onJoin}>Join</button>
          )}
        </div>

        {user.isAdmin && (
          <div className="challenge-admin">
            <Link
              to={`/challenges/manager/${challenge._id}/edit`}
              className="button"
            >
              Edit
            </Link>
            <button onClick={() => handleDeleteClick(challenge._id)}>X</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;