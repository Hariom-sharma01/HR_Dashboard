import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import Select from 'react-select';

// Helper function to add mock data
const addMockData = (users) => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design'];
  return users.map(user => ({
    ...user,
    department: departments[Math.floor(Math.random() * departments.length)],
    performanceRating: Math.floor(Math.random() * 5) + 1,
  }));
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users?limit=20');
        setUsers(addMockData(response.data.users));
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Unique departments and ratings for dropdown options
  const departmentOptions = useMemo(() => {
    const departments = [...new Set(users.map(user => user.department))];
    return departments.map(dep => ({ value: dep, label: dep }));
  }, [users]);

  const ratingOptions = [
    { value: 1, label: '⭐️ 1' },
    { value: 2, label: '⭐️⭐️ 2' },
    { value: 3, label: '⭐️⭐️⭐️ 3' },
    { value: 4, label: '⭐️⭐️⭐️⭐️ 4' },
    { value: 5, label: '⭐️⭐️⭐️⭐️⭐️ 5' }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.some(dep => dep.value === user.department);

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some(rating => rating.value === user.performanceRating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [searchTerm, users, selectedDepartments, selectedRatings]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
      <SearchBar onSearch={setSearchTerm} />

      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">Filter by Department</label>
          <Select
            options={departmentOptions}
            isMulti
            onChange={setSelectedDepartments}
            className="text-black"
            placeholder="Select departments"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">Filter by Performance Rating</label>
          <Select
            options={ratingOptions}
            isMulti
            onChange={setSelectedRatings}
            className="text-black"
            placeholder="Select ratings"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
