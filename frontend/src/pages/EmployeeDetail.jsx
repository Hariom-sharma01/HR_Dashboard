import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const generateMockPerformanceHistory = () => {
  const years = [2022, 2023, 2024];
  return years.map((year) => ({
    year,
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

const EmployeeDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bio, setBio] = useState('');
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
        setBio(`A passionate and dedicated team player who always strives to achieve the best results. ${response.data.firstName} has consistently exceeded performance expectations and is an asset to any team.`);
        setPerformanceHistory(generateMockPerformanceHistory());
      } catch (err) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.92-.755 1.688-1.538 1.118L10 13.347l-3.38 2.454c-.782.57-1.837-.197-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.625 9.4c-.783-.57-.38-1.81.588-1.81H7.39a1 1 0 00.95-.69l1.286-3.973z" />
        </svg>
      ))}
    </div>
  );

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center p-10">User not found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img src={user.image} alt={user.firstName} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-4xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{user.company.title} at {user.company.name}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {['Overview', 'Projects', 'Feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {`${user.address.address}, ${user.address.city}`}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Bio</h3>
            <p className="text-gray-700 dark:text-gray-300">{bio}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Past Performance History</h3>
            <ul className="space-y-2">
              {performanceHistory.map((record) => (
                <li key={record.year} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{record.year}</span>
                  {renderStars(record.rating)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {activeTab === 'Projects' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Internal HR Revamp Tool</li>
            <li>Employee Onboarding App</li>
            <li>Automated Payroll Bot</li>
          </ul>
        </div>
      )}

      {activeTab === 'Feedback' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Feedback</label>
              <textarea rows="4" className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
