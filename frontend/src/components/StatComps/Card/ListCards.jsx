import React from "react";
import Card from "./Card";
import "./ListCards.scss";

const ListCards = ({ cardsData }) => {
  return (
    <div className="list-cards-container">
      {cardsData.map((card, index) => (
        <Card key={index} cardInfo={card} />
      ))}
    </div>
  );
};

export default ListCards;