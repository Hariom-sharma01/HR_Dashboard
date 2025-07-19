import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentChart from '../components/DepartmentChart';

const addMockData = (users) => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design'];
    return users.map(user => ({
      ...user,
      department: departments[Math.floor(Math.random() * departments.length)],
      performanceRating: Math.floor(Math.random() * 5) + 1,
    }));
};

const Analytics = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await axios.get('https://dummyjson.com/users?limit=100');
            setUsers(addMockData(res.data.users));
            setLoading(false);
        };
        fetchAllUsers();
    }, []);

    if (loading) return <div>Loading chart data...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Performance Analytics</h1>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <DepartmentChart users={users} />
            </div>
        </div>
    );
};

export default Analytics;