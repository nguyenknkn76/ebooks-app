import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './LineChart.scss'
Chart.register(...registerables);

const LineChart = ({ usersData, booksData }) => {
  const data = {
    labels: usersData.map(item => item.month),
    datasets: [
      {
        label: 'Users',
        data: usersData.map(item => item.total),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Books',
        data: booksData.map(item => item.total),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Statistics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className='chart'>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;