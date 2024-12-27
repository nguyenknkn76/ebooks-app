import React from "react";
import Card from "./Card";
import "./ListCards.scss";
import { FaBook, FaUber, FaUser } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";

const ListCards = () => {
  const cardsData = [
    {
      title: 'Total Users',
      data: '20',
      link_text: 'View all books',
      icon: FaUser,
      iconColor: 'black'
    },
    {
      title: 'New Users',
      data: '5',
      link_text: 'View all books',
      icon: FaUser,
      iconColor: 'black'
    },
    {
      title: 'Total Books',
      data: '25',
      link_text: 'View all books',
      icon: FaBook,
      iconColor: 'black'
    },
    {
      title: 'Total Voices',
      data: '23',
      link_text: 'View all voices',
      icon: MdKeyboardVoice,
      iconColor: 'black'
    },
  ]
  return (
    <div className="list-cards-container">
      {cardsData.map((card, index) => (
        <Card key={index} cardInfo={card} />
      ))}
    </div>
  );
};

export default ListCards;
