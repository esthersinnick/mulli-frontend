import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../svg/pencil.svg'
import { ReactComponent as RemoveIcon } from '../svg/remove.svg'


const ChallengeCard = ({
  challenge,
  user,
  handleDeleteClick = () => { },
  onJoin = () => { },
  showJoinButton = false
}) => {

  const colors = ['#1D90BC', '#154B6B', '#648ADF', '#FC9566', '#F9C942', '#27285D'];
  const pickColor = () => {
    const index = Math.round(Math.random() * (colors.length - 1));
    return colors[index]
  }

  const randomBgColor = {
    backgroundColor: pickColor()
  }

  return (
    <div className="challenge-item">
      <div className="challenge-content" style={randomBgColor}>
        {user.isAdmin && (
          <div className="challenge-admin">
            <Link to={`/challenges/manager/${challenge._id}/edit`}><EditIcon /></Link>
            <div onClick={() => handleDeleteClick(challenge._id)}><RemoveIcon /></div>
          </div>
        )}
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

      </div>
    </div>
  );
};

export default ChallengeCard;