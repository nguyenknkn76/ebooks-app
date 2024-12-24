import React from 'react';
import './ListCards.scss';
import Card from '../Card/Card';

const ListCards = ({ cardInfos }) => {
  return (
    <div className="list-cards">
      {cardInfos.map((cardInfo, index) => (
        <Card key={index} cardInfo={cardInfo}/>
      ))}
    </div>
  );
};

export default ListCards;
