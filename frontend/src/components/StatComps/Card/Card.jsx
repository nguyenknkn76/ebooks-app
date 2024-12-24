import React from 'react';
import './Card.scss';

const Card = ({ cardInfo }) => {
  const IconComponent = cardInfo.icon;

  return (
    <div className="card">
      <div className="card-header">{cardInfo.title.toUpperCase()}</div>
      <div className="card-data">{cardInfo.data}</div>
      <div className="card-footer">
        <a href="#" className="card-link">
          {cardInfo.link_text}
        </a>
        {IconComponent && (
          <IconComponent className="card-icon" style={{ color: cardInfo.iconColor }} />
        )}
      </div>
    </div>
  );
};

export default Card;