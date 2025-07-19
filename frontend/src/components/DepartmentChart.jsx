import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentChart = ({ users }) => {
  // Process data to get average ratings per department
  const departmentData = users.reduce((acc, user) => {
    const { department, performanceRating } = user;
    if (!acc[department]) {
      acc[department] = { totalRating: 0, count: 0 };
    }
    acc[department].totalRating += performanceRating;
    acc[department].count += 1;
    return acc;
  }, {});

  const labels = Object.keys(departmentData);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: labels.map(dept => departmentData[dept].totalRating / departmentData[dept].count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Department-wise Average Ratings' },
    },
    scales: {
      y: { beginAtZero: true, max: 5 },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default DepartmentChart;