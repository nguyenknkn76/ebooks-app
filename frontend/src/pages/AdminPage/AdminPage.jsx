import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import BookService from "../../services/BookService";
import VoiceService from "../../services/VoiceService";
import ListCards from "../../components/StatComps/Card/ListCards";
import LineChart from "../../components/StatComps/Chart/LineChart";
// import "./AdminPage.scss";
import { FaBook, FaUser } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    totalBooks: 0,
    totalVoices: 0
  });
  const [monthlyData, setMonthlyData] = useState({
    users: [],
    books: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalUsers, newUsers, totalBooks, totalVoices, monthlyUsers, monthlyBooks] = 
          await Promise.all([
            UserService.countUsers(),
            UserService.countUsersThisMonth(),
            BookService.countBooks(),
            VoiceService.countVoices(),
            UserService.getTotalUsersInTwelveMonths(),
            BookService.getTotalBooksInTwelveMonths()
          ]);

        setStats({
          totalUsers: totalUsers.total,
          newUsers: newUsers.total,
          totalBooks: totalBooks.count,
          totalVoices: totalVoices.count
        });

        setMonthlyData({
          users: monthlyUsers,
          books: monthlyBooks
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error}</div>;

  const cardsData = [
    {
      title: 'Total Users',
      data: stats.totalUsers.toString(),
      link_text: 'View all users',
      icon: FaUser,
      iconColor: 'black'
    },
    {
      title: 'New Users',
      data: stats.newUsers.toString(),
      link_text: 'View all users',
      icon: FaUser,
      iconColor: 'black'
    },
    {
      title: 'Total Books',
      data: stats.totalBooks.toString(),
      link_text: 'View all books',
      icon: FaBook,
      iconColor: 'black'
    },
    {
      title: 'Total Voices',
      data: stats.totalVoices.toString(),
      link_text: 'View all voices',
      icon: MdKeyboardVoice,
      iconColor: 'black'
    }
  ];

  return (
    <div className="admin-page">
      <ListCards cardsData={cardsData}/>
      <LineChart 
        usersData={monthlyData.users} 
        booksData={monthlyData.books}
      />
    </div>
  );
};

export default AdminPage;